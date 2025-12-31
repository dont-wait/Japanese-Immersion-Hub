package com.minori.server.dto.request.vocabs;


import com.minori.server.dto.request.vocabs.meanings.MeaningCreateRequest;
import com.minori.server.dto.request.vocabs.sentences.VocabSentenceCreateRequest;
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
public class VocabCreateRequest {
    String vocabEx;

    String vocabKana;

    String vocabFurigana;

    String vocabPosName;

    List<VocabSentenceCreateRequest> vocabSentences;
    List<MeaningCreateRequest> meanings;
}
