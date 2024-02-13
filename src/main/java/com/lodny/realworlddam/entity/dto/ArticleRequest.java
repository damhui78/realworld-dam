package com.lodny.realworlddam.entity.dto;

import java.util.Set;

public record ArticleRequest(String title, String description, String body, Set<String> tagList) {
}
