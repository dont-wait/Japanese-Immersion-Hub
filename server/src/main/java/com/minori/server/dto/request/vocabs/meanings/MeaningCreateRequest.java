package com.minori.server.dto.request.vocabs.meanings;

import lombok.*;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MeaningCreateRequest {
    Integer vocabId;
    Integer sentenceId;
    String langCode;
    String meaningText;
}
