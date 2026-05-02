package com.minori.server.service.impl;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.minori.server.dto.request.auth.PasswordCreationRequest;
import com.minori.server.dto.request.auth.UserCreationRequest;
import com.minori.server.dto.request.auth.UserUpdateRequest;
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
    PasswordEncoder passwordEncoder;

    @Override
    public void deleteUser(String userId) {
        User existingUser = userRepository.findById(userId).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_FOUND));
        userRepository.deleteById(existingUser.getUserId());
    }

    @Override
    public List<UserResponse> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    @Override
    public UserResponse updateUser(String userId, UserUpdateRequest request) {

        User existingUser = userRepository.findById(userId).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_FOUND));

        // Chi cap nhat neu thay doi va kiem tra trung
        if (request.getUsername() != null &&
                !request.getUsername().equals(existingUser.getUsername()) &&
                userRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USERNAME_ALREADY_EXISTS);

        if (request.getEmail() != null &&
                !request.getEmail().equals(existingUser.getEmail()) &&
                userRepository.existsByEmail(request.getEmail()))
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);

        if (request.getPhone() != null &&
                !request.getPhone().equals(existingUser.getPhone()) &&
                userRepository.existsByPhone(request.getPhone()))
            throw new AppException(ErrorCode.PHONE_ALREADY_EXISTS);

        userMapper.updateUser(request, existingUser);
        userRepository.save(existingUser);

        return userMapper.toUserResponse(existingUser);
    }

    @Override
    public UserResponse createUserAccount(UserCreationRequest request) {

        if (userRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USERNAME_ALREADY_EXISTS);

        if (userRepository.existsByEmail(request.getEmail()))
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);

        if (userRepository.existsByPhone(request.getPhone()))
            throw new AppException(ErrorCode.PHONE_ALREADY_EXISTS);

        if (request.getPassword() != null && !request.getPassword().equals(request.getRepassword()))
            throw new AppException(ErrorCode.REPASSWORD_INVALID);

        Role existingRole = roleRepository.findByRoleId(request.getRoleId()).orElseThrow(
                () -> new AppException(ErrorCode.ROLE_ID_NOT_EXIST));

        User user = userMapper.toUser(request, existingRole);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(existingRole);

        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    @Override
    public UserResponse getUserById(String userId) {
        User existingUser = userRepository.findById(userId).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_FOUND));
        return userMapper
                .toUserResponse(existingUser);
    }

    @Override
    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        User existingUser = userRepository.findByUsername(username).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_FOUND));
        var userResponse = userMapper.toUserResponse(existingUser);
        userResponse.setHasPassword(StringUtils.hasText(existingUser.getPassword()));

        return userResponse;
    }

    @Override
    public void createPassword(PasswordCreationRequest request) {
        var context = SecurityContextHolder.getContext();

        String username = context.getAuthentication().getName();
        User existingUser = userRepository.findByUsername(username).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (StringUtils.hasText(existingUser.getPassword()))
            throw new AppException(ErrorCode.PASSWORD_EXISTED);

        existingUser.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(existingUser);
    }

}
