package com.minori.server.controller;

import java.text.ParseException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.minori.server.dto.ApiResponse;
import com.minori.server.dto.request.auth.AuthenticationRequest;
import com.minori.server.dto.request.auth.IntrospectRequest;
import com.minori.server.dto.response.auth.AuthenticationResponse;
import com.minori.server.dto.response.auth.IntrospectResponse;
import com.minori.server.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> login(@Valid @RequestBody AuthenticationRequest request) {
        var authenticationResponse = authenticationService.authenticate(request);
        return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(ApiResponse.<AuthenticationResponse>builder()
                .message("User logged in successfully")
                .result(authenticationResponse)
                .build());
    }

    @PostMapping("/introspect")
    public ResponseEntity<ApiResponse<IntrospectResponse>> introspect(@RequestBody IntrospectRequest request) throws JOSEException, ParseException {
        var authenticationResponse = authenticationService.introspect(request);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(ApiResponse.<IntrospectResponse>builder()
                    .result(authenticationResponse)
                    .build());
    } 
}
