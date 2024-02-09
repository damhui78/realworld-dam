package com.lodny.realworlddam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Following {

    @EmbeddedId
    private FollowingId followingId;


    public static Following of(final Long followeeId, final Long followerId) {
        return new Following(new FollowingId(followeeId, followerId));
    }

}
