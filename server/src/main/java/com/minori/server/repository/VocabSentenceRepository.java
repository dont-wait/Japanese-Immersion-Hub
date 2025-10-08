package com.minori.server.repository;

import com.minori.server.entity.VocabSentence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VocabSentenceRepository extends JpaRepository<VocabSentence,Integer> {
}
