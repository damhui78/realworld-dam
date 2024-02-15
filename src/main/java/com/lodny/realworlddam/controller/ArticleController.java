package com.lodny.realworlddam.controller;

import com.lodny.realworlddam.entity.dto.*;
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
    public ResponseEntity<?> createArticle(@RequestBody CreateArticleRequestWrapper createArticleRequestWrapper, @RequestHeader(value = "Authorization") String auth) {
        CreateArticleRequest createArticleRequest = createArticleRequestWrapper.article();
        log.info("createArticle() : createArticleRequest = {}", createArticleRequest);
        log.info("createArticle() : auth = {}", auth);

        ArticleResponse articleResponse = articleService.createArticle(createArticleRequest, auth);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(articleResponse);
    }

    @PutMapping("/{slug}")
    public ResponseEntity<?> updateArticle(@RequestBody UpdateArticleRequestWrapper updateArticleRequestWrapper,
                                           @PathVariable String slug,
                                           @RequestHeader(value = "Authorization") String auth) {
        UpdateArticleRequest updateArticleRequest = updateArticleRequestWrapper.article();
        log.info("updateArticle() : updateArticleRequest = {}", updateArticleRequest);
        log.info("updateArticle() : auth = {}", auth);

        ArticleResponse articleResponse = articleService.updateArticle(updateArticleRequest, slug, auth);

        return ResponseEntity.ok(articleResponse);
    }

    @DeleteMapping("/{slug}")
    public void deleteArticle(@PathVariable String slug ,@RequestHeader(value = "Authorization") String auth) {
        articleService.deleteArticle(slug, auth);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<?> getArticle(@PathVariable String slug, @RequestHeader(value = "Authorization", required = false) String auth) {
        log.info("getArticle() : slug = {}", slug);
        log.info("getArticle() : auth = {}", auth);

        return ResponseEntity.ok(articleService.getArticle(slug, auth));
    }

}
