package com.lodny.realworlddam.entity.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Builder;

@Builder
@JsonRootName("profile")
public record ProfileResponse(String username, String bio, String image, Boolean following) {
}
