package com.minori.server.service;

import java.util.List;

import com.minori.server.dto.request.auth.PasswordCreationRequest;
import com.minori.server.dto.request.auth.UserCreationRequest;
import com.minori.server.dto.request.auth.UserUpdateRequest;
import com.minori.server.dto.response.auth.UserResponse;

public interface UserService {
    UserResponse getUserById(String userId);

    UserResponse createUserAccount(UserCreationRequest request);

    UserResponse getMyInfo();

    List<UserResponse> getUsers();

    UserResponse updateUser(String userId, UserUpdateRequest request);

    void deleteUser(String userId);

    void createPassword(PasswordCreationRequest request);
    
}
