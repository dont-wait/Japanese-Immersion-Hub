package com.minori.server.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.minori.server.dto.request.auth.AuthenticationRequest;
import com.minori.server.entity.User;
import com.minori.server.enums.ErrorCode;
import com.minori.server.exception.AppException;
import com.minori.server.repository.UserRepository;
import com.minori.server.service.AuthenticationService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    @Override
    public Boolean authenticate(AuthenticationRequest request) {
        User existingUser = userRepository.findByUsername(request.getUsername()).orElseThrow(
            () -> new AppException(ErrorCode.USER_NOT_FOUND)
        );
        return passwordEncoder.matches(request.getPassword(), existingUser.getPassword());
    }
    
}
