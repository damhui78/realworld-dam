package com.lodny.realworlddam.entity.dto;

public record SearchArticleRequest(String tag, String author, String favorited, Integer limit, Integer offset) {
    public SearchArticleRequest {
        limit = limit == null ? 20 : limit;
        offset = offset == null ? 0 : offset;
    }
}
