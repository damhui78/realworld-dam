package com.lodny.realworlddam.entity.dto;

import java.util.List;

public record ArticlesResponse(
        List<ArticleResponse> articles,
        int articlesCount,
        int totalPages,
        int currentPageNo
) {
}
