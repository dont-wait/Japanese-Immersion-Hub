package com.minori.server.repository;

import com.minori.server.entity.VocabPos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VocabPosRepository extends JpaRepository<VocabPos,Integer> {
}
