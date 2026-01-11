package com.minori.server.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
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
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserController {
    UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> createUser(@Valid @RequestBody UserCreationRequest request) {
        return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(ApiResponse.<UserResponse>builder()
                .message("User created successfully")
                .result(userService.createUserAccount(request))
                .build());
    }

    @GetMapping("{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(String userId) {
        return ResponseEntity.ok(
            ApiResponse.<UserResponse>builder()
                .message("User fetched successfully")
                .result(userService.getUserById(userId))
                .build());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getUsers() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("Username: " + authentication.getName());

        authentication.getAuthorities().forEach(role -> {
            log.info("Role: " + role.getAuthority());
        });

        return ResponseEntity.ok(
                ApiResponse.<List<UserResponse>>builder()
                        .message("Users fetched successfully")
                        .result(userService.getUsers())
                        .build());
    }
    
    @GetMapping("@me")
    public ResponseEntity<ApiResponse<UserResponse>> getMyInfo() {
        return ResponseEntity.ok(
            ApiResponse.<UserResponse>builder()
                .message("User info fetched successfully")
                .result(userService.getMyInfo())
                .build());
    }
    

    @PutMapping("{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(String userId, @Valid @RequestBody UserUpdateRequest request) {
        return ResponseEntity.ok(
            ApiResponse.<UserResponse>builder()
                .message("User updated successfully")
                .result(userService.updateUser(userId, request))
                .build());
    }

    @DeleteMapping("{userId}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok(
            ApiResponse.<Void>builder()
                .message("User deleted successfully")
                .build());
    }
}
