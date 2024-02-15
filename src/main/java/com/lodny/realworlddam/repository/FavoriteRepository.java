package com.lodny.realworlddam.repository;

import com.lodny.realworlddam.entity.Favorite;
import com.lodny.realworlddam.entity.FavoriteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {
    Optional<Favorite> findByFavoriteIdArticleIdAndFavoriteIdUserId(Long articleId, Long userId);
    long countByFavoriteIdArticleId(Long articleId);
}
