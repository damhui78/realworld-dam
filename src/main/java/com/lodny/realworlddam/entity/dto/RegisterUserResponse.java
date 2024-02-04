package com.lodny.realworlddam.entity.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Builder;

@Builder
@JsonRootName("user")
public record RegisterUserResponse(String username, String email) {
}
