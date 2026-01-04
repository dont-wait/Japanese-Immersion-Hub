package com.minori.server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.minori.server.dto.request.auth.UserCreationRequest;
import com.minori.server.dto.response.auth.UserResponse;
import com.minori.server.entity.Role;
import com.minori.server.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "roleName", source="role.roleName")
    UserResponse toUserResponse(User user, Role role);
    User toUser(UserCreationRequest request);
}
