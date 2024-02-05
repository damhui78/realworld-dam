package com.lodny.realworlddam.entity.dto;

public record UpdateUserRequest(String email, String username, String password, String bio, String image) {
}
