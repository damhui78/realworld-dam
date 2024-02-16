package com.lodny.realworlddam.repository;

import com.lodny.realworlddam.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Article findBySlug(String slug);

    @Query("""
        select a from Article a
        where :tag in elements(a.tagList)
        order by a.createdAt desc
    """)
    List<Article> searchByTag(String tag);

    @Query("""
        select a from Article a
        join RealWorldUser u on u.id = a.authorId
        where u.username = :author
        order by a.createdAt
    """)
    List<Article> searchByAuthor(String author);

    @Query("""
        select a from Article a
        join Favorite f on f.favoriteId.articleId = a.id
        join RealWorldUser u on u.id = f.favoriteId.userId
        where u.username = :favorited
        order by a.createdAt
    """)
    List<Article> searchByFavorited(String favorited);

}
