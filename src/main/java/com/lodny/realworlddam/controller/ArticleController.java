package com.lodny.realworlddam.controller;

import com.lodny.realworlddam.entity.RealWorldUser;
import com.lodny.realworlddam.entity.dto.*;
import com.lodny.realworlddam.entity.wrapper.*;
import com.lodny.realworlddam.service.ArticleService;
import com.lodny.realworlddam.system.JwtSecured;
import com.lodny.realworlddam.system.LoginUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/articles")
@Slf4j
public class ArticleController {

    private final ArticleService articleService;

    @JwtSecured
    @PostMapping
    public ResponseEntity<?> createArticle(@RequestBody CreateArticleRequestWrapper createArticleRequestWrapper, @LoginUser RealWorldUser loginUser) {
        CreateArticleRequest createArticleRequest = createArticleRequestWrapper.article();
        log.info("createArticle() : createArticleRequest = {}", createArticleRequest);

        ArticleResponse articleResponse = articleService.createArticle(createArticleRequest, loginUser);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ArticleResponseWrapper(articleResponse));
    }

    @JwtSecured
    @PutMapping("/{slug}")
    public ResponseEntity<?> updateArticle(@RequestBody UpdateArticleRequestWrapper updateArticleRequestWrapper,
                                           @PathVariable String slug,
                                           @LoginUser RealWorldUser loginUser) {
        UpdateArticleRequest updateArticleRequest = updateArticleRequestWrapper.article();
        log.info("updateArticle() : updateArticleRequest = {}", updateArticleRequest);

        ArticleResponse articleResponse = articleService.updateArticle(updateArticleRequest, slug, loginUser);

        return ResponseEntity.ok(new ArticleResponseWrapper(articleResponse));
    }

    @JwtSecured
    @DeleteMapping("/{slug}")
    public ResponseEntity<?> deleteArticle(@PathVariable String slug ,@LoginUser RealWorldUser loginUser) {
        articleService.deleteArticle(slug, loginUser);

        return ResponseEntity.ok(Map.of());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<?> getArticle(@PathVariable String slug, @LoginUser RealWorldUser loginUser) {
        log.info("getArticle() : slug = {}", slug);

        return ResponseEntity.ok(new ArticleResponseWrapper(articleService.getArticle(slug, loginUser)));
    }

    @GetMapping
    public ResponseEntity<?> getArticles(SearchArticleRequest searchArticleRequest, @LoginUser RealWorldUser loginUser) {
        log.info("getArticles() : searchArticleRequest = {}", searchArticleRequest);

        return ResponseEntity.ok(articleService.getArticles(searchArticleRequest, loginUser));
    }

    @JwtSecured
    @GetMapping("/feed")
    public ResponseEntity<?> getFeed(SearchArticleRequest searchArticleRequest, @LoginUser RealWorldUser loginUser) {
        log.info("getFeed() : searchArticleRequest = {}", searchArticleRequest);

        return ResponseEntity.ok(articleService.getFeedArticles(searchArticleRequest, loginUser));
    }

    @JwtSecured
    @PostMapping("/{slug}/favorite")
    public ResponseEntity<?> createFavorite(@PathVariable String slug, @LoginUser RealWorldUser loginUser) {
        log.info("createFavorite() : slug = {}", slug);

        ArticleResponse articleResponse = articleService.createFavorite(slug, loginUser);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ArticleResponseWrapper(articleResponse));
    }

    @JwtSecured
    @DeleteMapping("/{slug}/favorite")
    public ResponseEntity<?> deleteFavorite(@PathVariable String slug, @LoginUser RealWorldUser loginUser) {
        log.info("deleteFavorite() : slug = {}", slug);

        ArticleResponse articleResponse = articleService.deleteFavorite(slug, loginUser);

        return ResponseEntity.ok(new ArticleResponseWrapper(articleResponse));
    }

    @JwtSecured
    @PostMapping("/{slug}/comments")
    public ResponseEntity<?> addComment(@PathVariable String slug, @RequestBody AddCommentRequestWrapper addCommentRequestWrapper, @LoginUser RealWorldUser loginUser) {
        log.info("addComment() : slug = {}", slug);
        AddCommentRequest addCommentRequest = addCommentRequestWrapper.comment();
        log.info("addComment() : addCommentRequest = {}", addCommentRequest);

        CommentResponse commentResponse = articleService.addComment(slug, addCommentRequest, loginUser);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CommentResponseWrapper(commentResponse));
    }

    @GetMapping("/{slug}/comments")
    public ResponseEntity<?> getComment(@PathVariable String slug, @LoginUser RealWorldUser loginUser) {
        log.info("getComment() : slug = {}", slug);
        log.info("getComment() : loginUser = {}", loginUser);

        return ResponseEntity.ok(new CommentsResponseWrapper(articleService.getComments(slug, loginUser)));
    }

    @JwtSecured
    @DeleteMapping("/{slug}/comments/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable String slug, @PathVariable Long id, @LoginUser RealWorldUser loginUser) {
        log.info("deleteComment() : slug = {}", slug);
        log.info("deleteComment() : id = {}", id);

        articleService.deleteComment(slug, id, loginUser);

        return ResponseEntity.ok(Map.of());
    }

}
