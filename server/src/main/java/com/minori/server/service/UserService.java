package com.minori.server.service;

import com.minori.server.dto.request.auth.UserCreationRequest;
import com.minori.server.dto.response.auth.UserResponse;

public interface UserService {
    UserResponse getUserById(String userId);
    UserResponse createUserAccount(UserCreationRequest request);    
}
