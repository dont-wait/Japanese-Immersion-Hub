package com.minori.server.repository;

import java.lang.StackWalker.Option;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.minori.server.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUserName(String userName);
    Optional<User> findByEmail(String email);
    Optional<User> findByPhone(String phone);
    Boolean existsByUserName(String userName);
    Boolean existsByEmail(String email);
    Boolean existsByPhone(String phone);
    
}
