package com.minori.server.service;

import com.minori.server.dto.request.vocabs.VocabCreateRequest;
import com.minori.server.dto.response.VocabResponse;

import java.util.List;

public interface VocabService {
    List<VocabResponse> getVocabs();
    VocabResponse createVocab(VocabCreateRequest request);
}
