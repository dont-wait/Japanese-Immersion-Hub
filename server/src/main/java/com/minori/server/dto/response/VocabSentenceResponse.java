package com.minori.server.dto.response;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VocabSentenceResponse {
    Integer vocabSentenceId;

    String vocabSentenceKana;

    String vocabSentenceFurigana;

    String vocabSentenceImage;

    String vocabSentenceCloze; //BT
}
