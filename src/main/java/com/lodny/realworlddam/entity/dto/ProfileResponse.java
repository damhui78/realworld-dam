package com.lodny.realworlddam.entity.dto;

import com.lodny.realworlddam.entity.RealWorldUser;

public record ProfileResponse(String username, String bio, String image, Boolean following) {
    public static ProfileResponse of(RealWorldUser user, Boolean following) {
        return new ProfileResponse(user.getUsername(), user.getBio(), user.getImage(), following);
    }
}
