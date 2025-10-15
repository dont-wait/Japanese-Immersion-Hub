package com.minori.server.dto.request.vocabs.translates;

import lombok.*;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@NoArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TranslateSentenceCreateRequest {
    Integer sentenceId;
    String langCode;
    String meaningText;
}
