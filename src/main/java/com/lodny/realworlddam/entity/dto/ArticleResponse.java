package com.lodny.realworlddam.entity.dto;

import com.lodny.realworlddam.entity.Article;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.Set;

@Builder
public record ArticleResponse(
        String slug,
        String title,
        String description,
        String body,
        Set<String> tagList,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Boolean favorited,
        Long favoritesCount,
        ProfileResponse author
) {
    public static ArticleResponse of(Article article, Boolean favorited, Long favoritesCount, ProfileResponse author) {
        return ArticleResponse.builder()
                .slug(article.getSlug())
                .title(article.getTitle())
                .description(article.getDescription())
                .body(article.getBody())
                .tagList(article.getTagList())
                .createdAt(article.getCreatedAt())
                .updatedAt(article.getUpdatedAt())
                .favorited(favorited)
                .favoritesCount(favoritesCount)
                .author(author)
                .build();
    }
}
