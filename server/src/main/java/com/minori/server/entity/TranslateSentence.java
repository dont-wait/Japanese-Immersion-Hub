package com.minori.server.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "translate_sentence")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class TranslateSentence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "translate_sentence_id")
    Integer translateSentenceId;

    @Column(name = "lang_code", length = 5, nullable = false)
    String langCode;

    @Column(name = "translate_text", columnDefinition = "TEXT", nullable = false)
    String translatedText;

    @ManyToOne
    @JoinColumn(name = "vocab_sentence_id", referencedColumnName = "vocab_sentence_id")
    VocabSentence vocabSentence;
}
