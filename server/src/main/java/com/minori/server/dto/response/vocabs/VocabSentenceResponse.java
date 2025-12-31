package com.minori.server.dto.response.vocabs;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VocabSentenceResponse {
    Integer vocabSentenceId;

    String vocabSentenceKana;

    String vocabSentenceFurigana;

    String vocabSentenceImage;

    String vocabSentenceCloze; //BT
}
