package com.lodny.realworlddam.entity.dto;

import com.lodny.realworlddam.entity.RealWorldUser;

public record ProfileResponse(String username, String bio, String image, Boolean following) {
    public static ProfileResponse of(RealWorldUser user, Boolean following) {
        String image = user.getImage() != null ? user.getImage() : "https://api.realworld.io/images/demo-avatar.png";
        return new ProfileResponse(user.getUsername(), user.getBio(), image, following);
    }
}
