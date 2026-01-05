package com.minori.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "permissions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "permission_id")
    Long permissionId;

    @Column(name = "permission_name", length = 50, nullable = false, unique = true)
    String permissionName;

    @Column(name = "permission_description", columnDefinition = "TEXT")
    String permissionDescription;

    @OneToMany(mappedBy = "permission",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    List<RolePermission> rolePermissions;

}
