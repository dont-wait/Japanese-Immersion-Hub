package com.minori.server.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

//Bang cau vi du: 1 Vocab N Sentence
@Entity
@Table(name = "vocab_sentence")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VocabSentence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vocab_sentence_id")
    Integer vocabSentenceId;

    @ManyToOne
    @JoinColumn(name = "vocab_id", referencedColumnName = "vocab_id")
    Vocab vocab;

    @OneToMany(mappedBy = "vocabSentence",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    List<TranslateSentence> translateSentences;

    @Column(name = "vocab_sentence_kana", nullable = false, columnDefinition = "TEXT")
    String vocabSentenceKana;

    @Column(name = "vocab_sentence_furigana", nullable = false, columnDefinition = "TEXT")
    String vocabSentenceFurigana;

    @Column(name = "vocab_sentence_image", nullable = false, columnDefinition = "VARCHAR(255)")
    String vocabSentenceImage;

    @Column(name = "vocab_sentence_cloze", columnDefinition = "TEXT")
    String vocabSentenceCloze; //BT


}
