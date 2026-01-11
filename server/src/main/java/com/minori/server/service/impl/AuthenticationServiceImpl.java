package com.minori.server.service.impl;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.minori.server.dto.request.auth.AuthenticationRequest;
import com.minori.server.dto.request.auth.IntrospectRequest;
import com.minori.server.dto.response.auth.AuthenticationResponse;
import com.minori.server.dto.response.auth.IntrospectResponse;
import com.minori.server.entity.User;
import com.minori.server.enums.ErrorCode;
import com.minori.server.exception.AppException;
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

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        User existingUser = userRepository.findByUsername(request.getUsername()).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_FOUND));
        boolean isAuthenticated = passwordEncoder.matches(request.getPassword(), existingUser.getPassword());
        if (!isAuthenticated) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        var token = generateToken(existingUser);
        return AuthenticationResponse.builder()
                .authenticated(true)
                .token(token)
                .build();
    }
    
    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        //Body trong payload -> Claims
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("minori-server")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))
                .claim("scope", buildScope(user))
                .build();

        //Payload payload = new Payload(jwtClaimsSet.toJSONObject());    

        JWSObject jwsObject = new JWSObject(header, jwtClaimsSet.toPayload());

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }
    
    private String buildScope(User user) {
        return user.getRole().getRoleName();
    }

    @Override
    public IntrospectResponse introspect(IntrospectRequest request)
    throws JOSEException, ParseException {
        var token = request.getToken();
        
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expirationTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);
    
        return IntrospectResponse.builder()
            .valid(verified && expirationTime.after(new Date()))
            .build();
    }
    
}
