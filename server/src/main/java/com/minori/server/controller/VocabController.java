package com.minori.server.controller;

import com.minori.server.dto.ApiResponse;
import com.minori.server.dto.request.vocabs.VocabCreateRequest;
import com.minori.server.dto.response.vocab.VocabResponse;
import com.minori.server.service.VocabService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/vocabs")
public class VocabController {

    VocabService vocabService;

    @PostMapping
    public ResponseEntity<ApiResponse<VocabResponse>> createVocab(@RequestBody @Valid VocabCreateRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.<VocabResponse>builder()
                        .message("Vocab created successfully")
                        .result(vocabService.createVocab(request))
                        .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<VocabResponse>>> getVocabs() {
        return ResponseEntity.ok(
            ApiResponse.<List<VocabResponse>>builder()
                .message("Get Vocabs")
                .result(vocabService.getVocabs())
                .build());
    }
}
