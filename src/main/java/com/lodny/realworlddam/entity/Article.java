package com.lodny.realworlddam.entity;

import com.lodny.realworlddam.entity.dto.CreateArticleRequest;
import com.lodny.realworlddam.entity.dto.UpdateArticleRequest;
import com.lodny.realworlddam.util.SlugUtil;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.StringUtils;
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
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
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

    public static Article of(CreateArticleRequest request, Long loginId) {
        return Article.builder()
                .slug(SlugUtil.generateSlug(request.title()))
                .title(request.title())
                .description(request.description())
                .body(request.body())
                .tagList(request.tagList())
                .authorId(loginId)
                .build();
    }

    public void update(UpdateArticleRequest request) {
        if (StringUtils.isNotBlank(request.title())) {
            this.title = request.title();
            this.slug = SlugUtil.generateSlug(request.title());
        }
        if (StringUtils.isNotBlank(request.description())) {
            this.description = request.description();
        }
        if (StringUtils.isNotBlank(request.body())) {
            this.body = request.body();
        }
    }
}
