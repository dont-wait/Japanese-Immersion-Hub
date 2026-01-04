package com.minori.server.service.impl;

import org.springframework.stereotype.Service;

import com.minori.server.dto.request.auth.UserCreationRequest;
import com.minori.server.dto.response.auth.UserResponse;
import com.minori.server.entity.Role;
import com.minori.server.entity.User;
import com.minori.server.enums.ErrorCode;
import com.minori.server.exception.AppException;
import com.minori.server.mapper.UserMapper;
import com.minori.server.repository.RoleRepository;
import com.minori.server.repository.UserRepository;
import com.minori.server.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    UserMapper userMapper;
    RoleRepository roleRepository;

    @Override
    public UserResponse createUserAccount(UserCreationRequest request) {
        
        if (userRepository.existsByUserName(request.getUserName()))
            throw new AppException(ErrorCode.USERNAME_ALREADY_EXISTS);

        if(userRepository.existsByEmail(request.getEmail()))
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);

        if(userRepository.existsByPhone(request.getPhone()))
            throw new AppException(ErrorCode.PHONE_ALREADY_EXISTS);
        
        Role existingRole = roleRepository.findByRoleId(request.getRoleId()).orElseThrow(
            () -> new AppException(ErrorCode.ROLE_ID_NOT_EXIST)
        );

        //TODO: Hash password, Validate email
        User user = userMapper.toUser(request);
        user.setRole(existingRole);

        userRepository.save(user);
        return userMapper.toUserResponse(user, existingRole);
    }

    @Override
    public UserResponse getUserById(String userId) {
        User existingUser = userRepository.findById(userId).orElseThrow(
            () -> new AppException(ErrorCode.USER_NOT_FOUND)
        );
        return userMapper
            .toUserResponse(existingUser, existingUser.getRole());
    }
    
}
