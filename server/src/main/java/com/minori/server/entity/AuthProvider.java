package com.minori.server.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "auth_providers")
public class AuthProvider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auth_provider_id")
    Long authProviderId;

    @Column(name = "provider_name", length = 100, nullable = false, unique = true)
    String providerName;

    @Column(name = "provider_type", length = 50, nullable = false, unique = true)
    String providerType;

    @OneToMany(mappedBy = "authProvider",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    List<User> users;
}
