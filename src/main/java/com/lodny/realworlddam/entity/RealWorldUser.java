package com.lodny.realworlddam.entity;

import com.lodny.realworlddam.entity.dto.RegisterUserRequest;
import com.lodny.realworlddam.entity.dto.UpdateUserRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@AllArgsConstructor
public class RealWorldUser {
    @Setter
    private Long id;

    private String username;
    private String email;
    private String password;

    private String bio;
    private String image;

    public static RealWorldUser of(RegisterUserRequest request) {
        return new RealWorldUser(
                0L,
                request.username(),
                request.email(),
                request.password(),
                null,
                null
        );
    }

    public void update(final UpdateUserRequest updateUserRequest) {
        Optional.ofNullable(updateUserRequest.username())
                .ifPresent(s -> this.username = s);

        Optional.ofNullable(updateUserRequest.password())
                .ifPresent(s -> this.password = s);

        this.bio = updateUserRequest.bio();
        this.image = updateUserRequest.image();
    }
}
