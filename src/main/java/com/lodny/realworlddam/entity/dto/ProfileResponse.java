package com.lodny.realworlddam.entity.dto;

import lombok.Builder;

@Builder
public record ProfileResponse(String username, String bio, String image, Boolean following) {
}
