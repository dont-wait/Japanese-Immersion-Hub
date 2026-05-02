package com.minori.server.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
@ToString
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    String userId;

    @Column(name = "user_name", length = 50, nullable = false, unique = true)
    String username;

    @Column(name = "email", nullable = false, unique = true)
    String email;

    @Column(name = "phone", nullable = false, length = 15, unique = true)
    String phone;

    @Column(name = "picture")
    String picture;

    @Column(name = "password")
    String password;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    Role role;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "user")
    List<UserAuthProvider> userAuthProviders;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<AuditLog> auditLogs;

}
