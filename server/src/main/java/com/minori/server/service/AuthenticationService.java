package com.minori.server.service;

import com.minori.server.dto.request.auth.AuthenticationRequest;

public interface AuthenticationService {
    Boolean authenticate(AuthenticationRequest request);
}
