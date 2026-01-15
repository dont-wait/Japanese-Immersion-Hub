package com.minori.server.enums;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
    INVALID_ID_KEY(1001, "Invalid Message key, you should check your key", HttpStatus.BAD_REQUEST), //Sai sot trong dat viec dat Message tai DTO
    
    UNCATEGORIZED(6789, "Uncategorized Exception", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHENTICATED(1005, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZEED(1006, "You do not have permission to access this resource", HttpStatus.FORBIDDEN),            
    
    USERNAME_NOT_BLANK(2001, "Username must not be blank", HttpStatus.BAD_REQUEST),
    EMAIL_NOT_BLANK(2001, "Email must not be blank", HttpStatus.BAD_REQUEST),
    PHONE_NOT_BLANK(2001, "Phone must not be blank", HttpStatus.BAD_REQUEST),
    PASSWORD_NOT_BLANK(2001, "Password must not be blank", HttpStatus.BAD_REQUEST),
    REPASSWORD_NOT_BLANK(2001, "Repassword must not be blank", HttpStatus.BAD_REQUEST),
    USERNAME_LENGTH_INVALID(2002, "Username length is invalid", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(2002, "Email is invalid", HttpStatus.BAD_REQUEST),
    PHONE_INVALID(2002, "Phone is invalid", HttpStatus.BAD_REQUEST),
    PASSWORD_LENGTH_INVALID(2002, "Password length is invalid", HttpStatus.BAD_REQUEST),
    PASSWORD_COMPLEXITY_INVALID(2002,
            "At least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters.",
            HttpStatus.BAD_REQUEST),
    REPASSWORD_INVALID(2002, "Repassword does not match password", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(2003, "User not found", HttpStatus.NOT_FOUND),
    USERNAME_ALREADY_EXISTS(2004, "Username already exists", HttpStatus.BAD_REQUEST),
    EMAIL_ALREADY_EXISTS(2004, "Email already exists", HttpStatus.BAD_REQUEST),
    PHONE_ALREADY_EXISTS(2004, "Phone already exists", HttpStatus.BAD_REQUEST),
    ROLE_ID_NOT_EXIST(2005, "Role ID does not exist", HttpStatus.NOT_FOUND);
    int code;
    String message;
    HttpStatus httpStatus;
}
