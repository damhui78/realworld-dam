package com.lodny.realworlddam.entity.dto;

import java.util.Set;

public record UpdateArticleRequest(String slug, String title, String description, String body, Set<String> tagList) {
}
