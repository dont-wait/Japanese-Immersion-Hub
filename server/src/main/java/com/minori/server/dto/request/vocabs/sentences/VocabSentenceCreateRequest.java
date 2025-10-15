package com.minori.server.dto.request.vocabs.sentences;

import com.minori.server.dto.request.vocabs.translates.TranslateSentenceCreateRequest;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

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

    List<TranslateSentenceCreateRequest> translateSentences;
}
