package com.lodny.realworlddam.entity.dto;

import lombok.Builder;

@Builder
public record LoginUserResponse(String email, String token, String username, String bio, String image) {
}
