package com.minori.server.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.minori.server.entity.AuthProvider;
import com.minori.server.entity.Role;
import com.minori.server.entity.User;
import com.minori.server.repository.AuthProviderRepository;
import com.minori.server.repository.RoleRepository;
import com.minori.server.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DataSeeder {
    RoleRepository roleRepository;
    AuthProviderRepository authProviderRepository;
    PasswordEncoder passwordEncoder;
    UserRepository userRepository;

    @Bean
    @Profile({ "dev", "test" }) // Chỉ chạy ở dev/test environment
    CommandLineRunner seedData() {
        return args -> {
            // ========================
            // Seed Roles
            // ========================
            if (roleRepository.count() == 0) {
                log.info("Seeding roles...");

                Role adminRole = new Role();
                adminRole.setRoleName("ADMIN");
                adminRole.setRoleDescription("Administrator with full access");

                Role learnerRole = new Role();
                learnerRole.setRoleName("LEARNER");
                learnerRole.setRoleDescription("Learner user with limited access");

                roleRepository.save(adminRole);
                roleRepository.save(learnerRole);

                log.info("Roles seeded successfully!");
            }

            // ========================
            // Seed Auth Providers
            // ========================
            if (authProviderRepository.count() == 0) {
                log.info("Seeding auth providers...");

                // Login bằng username/password
                AuthProvider credentials = new AuthProvider();
                credentials.setProviderName("USERNAME_PASSWORD");
                credentials.setProviderType("CREDENTIALS");

                // OAuth providers
                AuthProvider google = new AuthProvider();
                google.setProviderName("GOOGLE");
                google.setProviderType("OAUTH");

                AuthProvider facebook = new AuthProvider();
                facebook.setProviderName("FACEBOOK");
                facebook.setProviderType("OAUTH");

                AuthProvider github = new AuthProvider();
                github.setProviderName("GITHUB");
                github.setProviderType("OAUTH");

                // Save tất cả
                authProviderRepository.save(credentials);
                authProviderRepository.save(google);
                authProviderRepository.save(facebook);
                authProviderRepository.save(github);

                log.info("Auth providers seeded successfully!");
            }
            if(userRepository.findByUsername("ADMIN").isEmpty()) {
                log.info("Seeding default admin user...");

                Role adminRole = roleRepository.findByRoleName("ADMIN").orElseThrow(() -> new RuntimeException("Admin role not found"));

                User adminUser = User.builder()
                        .username("ADMIN")
                        .email("adminjp@gmail.com")
                        .phone("+8411111111111")
                        .password(passwordEncoder.encode("Admin@123"))
                        .role(adminRole)
                        .build();
                userRepository.save(adminUser);

                log.info("Default admin user seeded successfully!");
            }
        };
    }
}
