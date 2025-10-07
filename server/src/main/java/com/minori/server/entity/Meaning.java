package com.minori.server.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "meanings")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Meaning {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meaning_id")
    Integer meaningId;

    @ManyToOne
    @JoinColumn(name = "vocab_id", referencedColumnName = "vocab_id")
    Vocab vocab;

    @ManyToOne
    @JoinColumn(name = "vocab_sentence_id", referencedColumnName = "vocab_sentence_id")
    VocabSentence vocabSentence;

    @Column(name = "lang_code", length = 5, nullable = false)
    String langCode;

    @Column(name = "meaning_text", columnDefinition = "TEXT", nullable = false)
    String meaningText;

}
