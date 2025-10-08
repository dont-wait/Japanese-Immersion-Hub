package com.minori.server.service.impl;

import com.minori.server.dto.request.vocabs.VocabCreateRequest;
import com.minori.server.dto.response.VocabResponse;
import com.minori.server.entity.Vocab;
import com.minori.server.mapper.VocabMapper;
import com.minori.server.repository.VocabPosRepository;
import com.minori.server.repository.VocabRepository;
import com.minori.server.repository.VocabSentenceRepository;
import com.minori.server.service.VocabService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class VocabServiceImpl implements VocabService {

    VocabRepository vocabRepository;
    VocabSentenceRepository vocabSentenceRepository;
    VocabPosRepository vocabPosRepository;
    VocabMapper vocabMapper;

    @Override
    public List<VocabResponse> getVocabs() {
        return List.of();
    }

    @Override
    public VocabResponse createVocab(VocabCreateRequest request) {

        Vocab newVocab = vocabMapper.toVocab(request);
        vocabRepository.save(newVocab);

        return vocabMapper.toVocabResponse(newVocab);
    }
}
