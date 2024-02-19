package com.lodny.realworlddam.controller;

import com.lodny.realworlddam.entity.dto.*;
import com.lodny.realworlddam.entity.wrapper.*;
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
                .body(new ArticleResponseWrapper(articleResponse));
    }

    @PutMapping("/{slug}")
    public ResponseEntity<?> updateArticle(@RequestBody UpdateArticleRequestWrapper updateArticleRequestWrapper,
                                           @PathVariable String slug,
                                           @RequestHeader(value = "Authorization") String auth) {
        UpdateArticleRequest updateArticleRequest = updateArticleRequestWrapper.article();
        log.info("updateArticle() : updateArticleRequest = {}", updateArticleRequest);
        log.info("updateArticle() : auth = {}", auth);

        ArticleResponse articleResponse = articleService.updateArticle(updateArticleRequest, slug, auth);

        return ResponseEntity.ok(new ArticleResponseWrapper(articleResponse));
    }

    @DeleteMapping("/{slug}")
    public void deleteArticle(@PathVariable String slug ,@RequestHeader(value = "Authorization") String auth) {
        articleService.deleteArticle(slug, auth);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<?> getArticle(@PathVariable String slug, @RequestHeader(value = "Authorization", required = false) String auth) {
        log.info("getArticle() : slug = {}", slug);
        log.info("getArticle() : auth = {}", auth);

        return ResponseEntity.ok(new ArticleResponseWrapper(articleService.getArticle(slug, auth)));
    }

    @GetMapping
    public ResponseEntity<?> getArticles(SearchArticleRequest searchArticleRequest, @RequestHeader(value = "Authorization", required = false) String auth) {
        log.info("getArticles() : searchArticleRequest = {}", searchArticleRequest);

        return ResponseEntity.ok(articleService.getArticles(searchArticleRequest, auth));
    }

    @GetMapping("/feed")
    public ResponseEntity<?> getFeed(SearchArticleRequest searchArticleRequest, @RequestHeader(value = "Authorization") String auth) {
        log.info("getFeed() : searchArticleRequest = {}", searchArticleRequest);

        return ResponseEntity.ok(articleService.getFeedArticles(searchArticleRequest, auth));
    }

    @PostMapping("/{slug}/favorite")
    public ResponseEntity<?> createFavorite(@PathVariable String slug, @RequestHeader(value = "Authorization") String auth) {
        log.info("createFavorite() : slug = {}", slug);

        ArticleResponse articleResponse = articleService.createFavorite(slug, auth);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ArticleResponseWrapper(articleResponse));
    }

    @DeleteMapping("/{slug}/favorite")
    public ResponseEntity<?> deleteFavorite(@PathVariable String slug, @RequestHeader(value = "Authorization") String auth) {
        log.info("deleteFavorite() : slug = {}", slug);

        ArticleResponse articleResponse = articleService.deleteFavorite(slug, auth);

        return ResponseEntity.ok(new ArticleResponseWrapper(articleResponse));
    }

    @PostMapping("/{slug}/comments")
    public ResponseEntity<?> addComment(@PathVariable String slug, @RequestBody AddCommentRequestWrapper addCommentRequestWrapper, @RequestHeader(value = "Authorization") String auth) {
        log.info("addComment() : slug = {}", slug);
        AddCommentRequest addCommentRequest = addCommentRequestWrapper.comment();
        log.info("addComment() : addCommentRequest = {}", addCommentRequest);

        CommentResponse commentResponse = articleService.addComment(slug, addCommentRequest, auth);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CommentResponseWrapper(commentResponse));
    }

}
