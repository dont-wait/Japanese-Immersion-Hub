package com.minori.server.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.minori.server.dto.ApiResponse;
import com.minori.server.dto.request.auth.UserCreationRequest;
import com.minori.server.dto.request.auth.UserUpdateRequest;
import com.minori.server.dto.response.auth.UserResponse;
import com.minori.server.service.UserService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;
    
    @PostMapping("/register")
    public ApiResponse<UserResponse> createUser(@Valid @RequestBody UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .message("User created successfully")
                .result(userService.createUserAccount(request))
                .build();
    }

    @GetMapping("{userId}")
    public ApiResponse<UserResponse> getUserById(String userId) {
        return ApiResponse.<UserResponse>builder()
                .message("User fetched successfully")
                .result(userService.getUserById(userId))
                .build();
    }

    @GetMapping
    public ApiResponse<List<UserResponse>> getUsers() {
        return ApiResponse.<List<UserResponse>>builder()
                .message("Users fetched successfully")
                .result(userService.getUsers())
                .build();
    }

    @PutMapping("{userId}")
    public ApiResponse<UserResponse> updateUser(String userId, @Valid @RequestBody UserUpdateRequest request) {
        return ApiResponse.<UserResponse>builder()
                .message("User updated successfully")
                .result(userService.updateUser(userId, request))
                .build();
    }

    @DeleteMapping("{userId}")
    public ApiResponse<Void> deleteUser(String userId) {
        userService.deleteUser(userId);
        return ApiResponse.<Void>builder()
                .message("User deleted successfully")
                .build();
    }
}
