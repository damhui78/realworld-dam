package com.lodny.realworlddam.controller;

import com.lodny.realworlddam.entity.dto.ArticleRequest;
import com.lodny.realworlddam.entity.dto.ArticleRequestWrapper;
import com.lodny.realworlddam.entity.dto.ArticleResponse;
import com.lodny.realworlddam.service.ArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/articles")
@Slf4j
public class ArticleController {

    private final ArticleService articleService;

    @PostMapping
    public ResponseEntity<?> createArticle(@RequestBody ArticleRequestWrapper articleRequestWrapper, @RequestHeader(value = "Authorization") String auth) {
        ArticleRequest articleRequest = articleRequestWrapper.article();
        log.info("createArticle() : articleRequest = {}", articleRequest);
        log.info("createArticle() : auth = {}", auth);

        ArticleResponse articleResponse = articleService.createArticle(articleRequest, auth);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(articleResponse);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<?> getArticle(@PathVariable String slug, @RequestHeader(value = "Authorization", required = false) String auth) {
        log.info("getArticle() : slug = {}", slug);
        log.info("getArticle() : auth = {}", auth);

        return ResponseEntity.ok(articleService.getArticle(slug, auth));
    }

}
