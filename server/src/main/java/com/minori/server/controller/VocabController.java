package com.minori.server.controller;

import com.minori.server.dto.ApiResponse;
import com.minori.server.dto.request.vocabs.VocabCreateRequest;
import com.minori.server.dto.response.vocabs.VocabResponse;
import com.minori.server.service.VocabService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/vocabs")
public class VocabController {

    VocabService vocabService;

    @PostMapping
    public ApiResponse<VocabResponse> createVocab(@RequestBody @Valid VocabCreateRequest request) {

        return ApiResponse.<VocabResponse>builder()
                .message("Create Vocab successfully")
                .result(vocabService.createVocab(request))
                .build();
    }

    @GetMapping
    public ApiResponse<List<VocabResponse>> getVocabs() {
        return ApiResponse.<List<VocabResponse>>builder()
                .message("Get Vocabs")
                .result(vocabService.getVocabs())
                .build();
    }
}
