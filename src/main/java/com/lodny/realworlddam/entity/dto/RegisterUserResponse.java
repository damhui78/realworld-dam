package com.lodny.realworlddam.entity.dto;

import lombok.Builder;

@Builder
public record RegisterUserResponse(String username, String email) {
}
