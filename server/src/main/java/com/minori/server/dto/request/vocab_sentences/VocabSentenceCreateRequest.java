package com.minori.server.dto.request.vocab_sentences;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VocabSentenceCreateRequest {


    Integer vocabId;

    String vocabSentenceKana;

    String vocabSentenceFurigana;

    String vocabSentenceImage;

    String vocabSentenceCloze;
}
