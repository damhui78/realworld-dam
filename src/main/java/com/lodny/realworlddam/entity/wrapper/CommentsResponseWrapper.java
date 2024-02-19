package com.lodny.realworlddam.entity.wrapper;

import com.lodny.realworlddam.entity.dto.CommentResponse;

import java.util.List;

public record CommentsResponseWrapper(List<CommentResponse> comments) {
}
