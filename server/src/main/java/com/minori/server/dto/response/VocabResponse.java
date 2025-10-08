package com.minori.server.dto.response;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VocabResponse {
    Integer vocabId;

    String vocabEx;

    String vocabKana;

    String vocabFurigana;

    String vocabPosName;

    List<VocabSentenceResponse> sentences;
}
