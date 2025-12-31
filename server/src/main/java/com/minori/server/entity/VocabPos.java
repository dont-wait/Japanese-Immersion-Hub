package com.minori.server.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "vocabs_pos")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
//Luu bang tu loai
public class VocabPos {
    @Id
    @Column(name = "vocab_pos_name", length = 20)
    String vocabPosName;

    @Column(name = "vocab_pos_description",
            length = 150,
            columnDefinition = "LONGTEXT")
    String vocabPosDescription;

    @OneToMany(mappedBy = "vocabPos",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    List<Vocab> vocabs;
}
