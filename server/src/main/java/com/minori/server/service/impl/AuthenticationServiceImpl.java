package com.minori.server.service.impl;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.minori.server.dto.request.auth.AuthenticationRequest;
import com.minori.server.dto.request.auth.ExchangeTokenRequest;
import com.minori.server.dto.request.auth.IntrospectRequest;
import com.minori.server.dto.request.auth.LogoutRequest;
import com.minori.server.dto.response.auth.AuthenticationResponse;
import com.minori.server.dto.response.auth.IntrospectResponse;
import com.minori.server.entity.InvalidatedToken;
import com.minori.server.entity.Role;
import com.minori.server.entity.User;
import com.minori.server.entity.UserAuthProvider;
import com.minori.server.enums.ErrorCode;
import com.minori.server.exception.AppException;
import com.minori.server.repository.AuthProviderRepository;
import com.minori.server.repository.InvalidatedTokenRepository;
import com.minori.server.repository.OutboundIdentityClient;
import com.minori.server.repository.OutboundUserClient;
import com.minori.server.repository.RoleRepository;
import com.minori.server.repository.UserAuthProviderRepository;
import com.minori.server.repository.UserRepository;
import com.minori.server.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    OutboundIdentityClient outboundIdentityClient;
    OutboundUserClient outboundUserClient;
    RoleRepository roleRepository;
    InvalidatedTokenRepository invalidatedTokenRepository;
    AuthProviderRepository authProviderRepository;
    UserAuthProviderRepository userAuthProviderRepository;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${oauth2.clientId}")
    protected String CLIENT_ID;

    @NonFinal
    @Value("${oauth2.clientSecret}")
    protected String CLIENT_SECRET;

    @NonFinal
    @Value("${oauth2.redirectUri}")
    protected String REDIRECT_URI;

    @NonFinal
    @Value("${oauth2.grantType}")
    protected String GRANT_TYPE;

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        User existingUser = userRepository.findByUsername(request.getUsername()).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_FOUND));
        boolean isAuthenticated = passwordEncoder.matches(request.getPassword(), existingUser.getPassword());
        if (!isAuthenticated) {
            throw new AppException(ErrorCode.AUTH_INFO_NOT_CORRECT);
        }

        var token = generateToken(existingUser);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("minori-server")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))
                .claim("scope", buildScope(user))
                .jwtID(UUID.randomUUID().toString())
                .build();

        JWSObject jwsObject = new JWSObject(header, jwtClaimsSet.toPayload());

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes(StandardCharsets.UTF_8)));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException("Lỗi ký token", e);
        }
    }

    private String buildScope(User user) {
        return user.getRole().getRoleName();
    }

    @Override
    public IntrospectResponse introspect(IntrospectRequest request)
            throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;
        try {
            verifyToken(token);
        } catch (AppException e) {
            isValid = false;
        }
        return IntrospectResponse.builder().valid(isValid).build();
    }

    private SignedJWT verifyToken(String token) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes(StandardCharsets.UTF_8));
        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expirationTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        var verified = signedJWT.verify(verifier);

        if (!(verified && expirationTime.after(new Date()))) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return signedJWT;
    }

    @Override
    public void logout(LogoutRequest request) throws JOSEException, ParseException {
        try {
            var signedToken = verifyToken(request.getToken());
            String jit = signedToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signedToken.getJWTClaimsSet().getExpirationTime();

            invalidatedTokenRepository.save(InvalidatedToken.builder()
                    .id(jit)
                    .expiryTime(expiryTime)
                    .build());
        } catch (AppException e) {
            log.info("Token đã hết hạn hoặc không tồn tại");
        }
    }

    @Override
    @Transactional
    public AuthenticationResponse outboundAuthenticate(String code) {
        var response = outboundIdentityClient.exchangeToken(ExchangeTokenRequest.builder()
                .code(code)
                .clientId(CLIENT_ID)
                .clientSecret(CLIENT_SECRET)
                .redirectUri(REDIRECT_URI)
                .grantType(GRANT_TYPE)
                .build());

        var userInfo = outboundUserClient.getUserInfo(response.getAccessToken());

        User user = userRepository.findByEmail(userInfo.getEmail()).orElseGet(() -> {
            Role learnerRole = roleRepository.findByRoleName("LEARNER")
                    .orElseThrow(() -> new AppException(ErrorCode.ROLE_ID_NOT_EXIST));

            User newUser = userRepository.save(User.builder()
                    .username(userInfo.getEmail())
                    .email(userInfo.getEmail())
                    .phone("G_" + userInfo.getSub().substring(0, 10))
                    .password("")
                    .role(learnerRole)
                    .picture(userInfo.getPicture())
                    .build());
            
            var googleProvider = authProviderRepository.findByProviderName("GOOGLE")
                    .orElseThrow(() -> new AppException(ErrorCode.PROVIDER_NAME_NOT_EXIST));
            
            userAuthProviderRepository.save(new UserAuthProvider(null, newUser, googleProvider));
            
            return newUser;
        });

        var token = generateToken(user);
        return AuthenticationResponse.builder().token(token).build();
    }
}
