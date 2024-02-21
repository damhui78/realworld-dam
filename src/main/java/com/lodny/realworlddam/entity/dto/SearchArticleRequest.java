package com.lodny.realworlddam.entity.dto;

import org.springframework.util.StringUtils;

public record SearchArticleRequest(
        String tag,
        String author,
        String favorited,
        Integer limit,
        Integer offset,
        String type
) {
    public SearchArticleRequest {
        limit = limit == null ? 20 : limit;
        offset = offset == null ? 0 : offset;

        if (StringUtils.hasText(tag)) {
            type = "tag";
        } else if (StringUtils.hasText(author)) {
            type = "author";
        } else if (StringUtils.hasText(favorited)) {
            type = "favorited";
        } else {
            type = "";
        }
    }
}
