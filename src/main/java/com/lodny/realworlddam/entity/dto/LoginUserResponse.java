package com.lodny.realworlddam.entity.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Builder;

@Builder
@JsonRootName("user")
public record LoginUserResponse(String email, String token, String username, String bio, String image) {
}
