package com.minori.server.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Table(name = "vocabs")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
//Luu tu vung
public class Vocab extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vocab_id")
    Integer vocabId;

    @Column(name = "vocab_ex", nullable = false, length = 150)
    String vocabEx;

    @Column(name = "vocab_kana", nullable = false, length = 150)
    String vocabKana;

    @Column(name = "vocab_furigana", nullable = false, length = 150)
    String vocabFurigana;

    @ManyToOne
    @JoinColumn(name = "vocab_pos_name", referencedColumnName = "vocab_pos_name")
    VocabPos vocabPos;

    @OneToMany(mappedBy = "vocab",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    List<VocabSentence> vocabSentences;

    @OneToMany(mappedBy = "vocab",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    List<Meaning> meanings;
}
