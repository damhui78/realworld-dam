package com.lodny.realworlddam.entity;

import com.lodny.realworlddam.entity.dto.ArticleRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String slug;
    private String title;
    private String description;
    private String body;
    @ElementCollection
    @CollectionTable(name = "article_tag", joinColumns = @JoinColumn(name = "article_id"))
    @Column(name = "tag")
    private Set<String> tagList = new HashSet<>();
    private Long authorId;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    public static Article of(ArticleRequest request, Long loginId) {
        return Article.builder()
                .slug(request.title())
                .title(request.title())
                .description(request.description())
                .body(request.body())
                .tagList(request.tagList())
                .authorId(loginId)
                .build();
    }
}
