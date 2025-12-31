package com.minori.server.dto.response.vocabs;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VocabResponse {
    Integer vocabId;

    String vocabEx;

    String vocabKana;

    String vocabFurigana;

    String vocabPosName;

    List<VocabSentenceResponse> sentences;
    List<MeaningResponse> meanings;
}
