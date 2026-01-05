package com.minori.server.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@Table(name = "role_permission")
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class RolePermission {
    @Id
    @Column(name = "role_permission_id")
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    Integer rolePermissionId;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    Role role;

    @ManyToOne
    @JoinColumn(name = "permission_id", referencedColumnName = "permission_id")
    Permission permission;
}
