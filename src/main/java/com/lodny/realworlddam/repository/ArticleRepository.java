package com.lodny.realworlddam.repository;

import com.lodny.realworlddam.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Article findBySlug(String slug);

    @Query("""
        select a from Article a
        where :tag in elements(a.tagList)
        order by a.createdAt desc
    """)
    Page<Article> searchByTag(String tag, Pageable pageable);

    @Query("""
        select a from Article a
        join RealWorldUser u on u.id = a.authorId
        where u.username = :author
        order by a.createdAt
    """)
    Page<Article> searchByAuthor(String author, Pageable pageable);

    @Query("""
        select a from Article a
        join Favorite f on f.favoriteId.articleId = a.id
        join RealWorldUser u on u.id = f.favoriteId.userId
        where u.username = :favorited
        order by a.createdAt
    """)
    Page<Article> searchByFavorited(String favorited, Pageable pageable);

}
