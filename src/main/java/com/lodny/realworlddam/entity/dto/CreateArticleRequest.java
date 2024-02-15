package com.lodny.realworlddam.entity.dto;

import java.util.Set;

public record CreateArticleRequest(String title, String description, String body, Set<String> tagList) {
}
