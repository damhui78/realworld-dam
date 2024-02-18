package com.lodny.realworlddam.entity.dto;

import com.lodny.realworlddam.entity.RealWorldUser;

public record LoginUserResponse(String email, String token, String username, String bio, String image) {
    public static LoginUserResponse of(RealWorldUser user, String jwt) {
        return new LoginUserResponse(user.getEmail(), jwt, user.getUsername(), user.getBio(), user.getImage());
    }
}
