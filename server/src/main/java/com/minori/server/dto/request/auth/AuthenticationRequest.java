package com.minori.server.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
public class AuthenticationRequest {

    @NotBlank(message = "USERNAME_NOT_BLANK")
    String userName;
    @NotBlank(message = "PASSWORD_NOT_BLANK")
    String password;
}
