package com.minori.server.repository;

import com.minori.server.entity.Vocab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VocabRepository extends JpaRepository<Vocab, Integer> {
    Optional<Vocab> findByVocabId(Integer vocabId);
    Boolean existsByVocabEx(String vocabEx);
}
