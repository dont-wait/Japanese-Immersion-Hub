package com.minori.server.mapper;

import com.minori.server.dto.request.vocabs.VocabCreateRequest;
import com.minori.server.dto.response.vocabs.VocabResponse;
import com.minori.server.entity.Vocab;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VocabMapper {

    @Mapping(target = "vocabPosName", source = "vocabPos.vocabPosName")
    VocabResponse toVocabResponse(Vocab vocab);
    Vocab toVocab(VocabCreateRequest request);
}
