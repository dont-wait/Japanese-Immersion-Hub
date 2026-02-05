package com.minori.server.service;

import java.text.ParseException;

import com.minori.server.dto.request.auth.AuthenticationRequest;
import com.minori.server.dto.request.auth.IntrospectRequest;
import com.minori.server.dto.response.auth.AuthenticationResponse;
import com.minori.server.dto.response.auth.IntrospectResponse;
import com.nimbusds.jose.JOSEException;

public interface AuthenticationService {
    AuthenticationResponse authenticate(AuthenticationRequest request);

    IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException;

    AuthenticationResponse outboundAuthenticate(String code);
}
