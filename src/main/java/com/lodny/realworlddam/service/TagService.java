package com.lodny.realworlddam.service;

import com.lodny.realworlddam.entity.dto.TagsResponse;
import com.lodny.realworlddam.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TagService {

    private final ArticleRepository articleRepository;


    public TagsResponse getTags() {
        List<String> tags = articleRepository.getTags();
        log.info("getTags() : tags = {}", tags);

        return new TagsResponse(tags);
    }

}
