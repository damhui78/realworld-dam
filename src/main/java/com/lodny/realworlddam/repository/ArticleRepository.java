package com.lodny.realworlddam.repository;

import com.lodny.realworlddam.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Article findBySlug(String slug);
}
