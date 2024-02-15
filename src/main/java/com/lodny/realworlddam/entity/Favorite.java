package com.lodny.realworlddam.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Favorite {

    @EmbeddedId
    private FavoriteId favoriteId;

    public static Favorite of(final Long articleId, final Long userId) {
        return new Favorite(new FavoriteId(articleId, userId));
    }
}
