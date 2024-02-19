package com.lodny.realworlddam.entity;

import com.lodny.realworlddam.entity.dto.AddCommentRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long articleId;
    @Column(nullable = false)
    private String body;
    @Column(nullable = false)
    private Long authorId;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    public static Comment of(Long articleId, AddCommentRequest request, Long loginId) {
        return Comment.builder()
                .articleId(articleId)
                .body(request.body())
                .authorId(loginId)
                .build();
    }

}
