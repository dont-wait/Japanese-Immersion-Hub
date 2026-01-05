package com.minori.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.minori.server.entity.AuthProvider;

@Repository
public interface AuthProviderRepository extends JpaRepository<AuthProvider, Long> {

}
