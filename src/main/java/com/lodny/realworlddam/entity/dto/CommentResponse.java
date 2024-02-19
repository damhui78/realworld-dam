package com.lodny.realworlddam.entity.dto;

import com.lodny.realworlddam.entity.Comment;

import java.time.LocalDateTime;

public record CommentResponse(
        Long id,
        String body,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        ProfileResponse author
) {
    public static CommentResponse of(Comment comment, ProfileResponse author) {
        return new CommentResponse(comment.getId(),
                comment.getBody(),
                comment.getCreatedAt(),
                comment.getUpdatedAt(),
                author);
    }
}
