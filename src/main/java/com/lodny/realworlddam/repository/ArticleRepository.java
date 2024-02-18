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
        select a, u, f, l,
            (select count(t) from Favorite t where t.favoriteId.articleId = a.id) as favorites_count
        from Article a
        join RealWorldUser u on u.id = a.authorId
        left join Following f on f.followingId.followeeId = a.authorId and f.followingId.followerId = :loginId
        left join Favorite l on l.favoriteId.articleId = a.id and l.favoriteId.userId = :loginId
        where a.slug = :slug
    """)
    Object searchBySlug(String slug, Long loginId);

    @Query("""
        select a, u, f, l,
            (select count(t) from Favorite t where t.favoriteId.articleId = a.id) as favorites_count
        from Article a
        join RealWorldUser u on u.id = a.authorId
        left join Following f on f.followingId.followeeId = a.authorId and f.followingId.followerId = :loginId
        left join Favorite l on l.favoriteId.articleId = a.id and l.favoriteId.userId = :loginId
        where :tag in elements(a.tagList)
        order by a.createdAt desc
    """)
    Page<Object[]> searchByTag(String tag, Long loginId, Pageable pageable);

    @Query("""
        select a, u, f, l,
            (select count(t) from Favorite t where t.favoriteId.articleId = a.id) as favorites_count
        from Article a
        join RealWorldUser u on u.id = a.authorId
        left join Following f on f.followingId.followeeId = a.authorId and f.followingId.followerId = :loginId
        left join Favorite l on l.favoriteId.articleId = a.id and l.favoriteId.userId = :loginId
        where u.username = :author
        order by a.createdAt desc
    """)
    Page<Object[]> searchByAuthor(String author, Long loginId, Pageable pageable);

    @Query("""
        select a, u, f, l,
            (select count(t) from Favorite t where t.favoriteId.articleId = a.id) as favorites_count
        from Article a
        join RealWorldUser u on u.id = a.authorId
        join Favorite fv on fv.favoriteId.articleId = a.id
        join RealWorldUser fvu on fvu.id = fv.favoriteId.userId
        left join Following f on f.followingId.followeeId = a.authorId and f.followingId.followerId = :loginId
        left join Favorite l on l.favoriteId.articleId = a.id and l.favoriteId.userId = :loginId
        where fvu.username = :favorited
        order by a.createdAt desc
    """)
    Page<Object[]> searchByFavorited(String favorited, Long loginId, Pageable pageable);

    @Query("""
        select a, u, f, l,
            (select count(t) from Favorite t where t.favoriteId.articleId = a.id) as favorites_count
        from Article a
        join RealWorldUser u on u.id = a.authorId
        join Following f on f.followingId.followeeId = a.authorId and f.followingId.followerId = :loginId
        left join Favorite l on l.favoriteId.articleId = a.id and l.favoriteId.userId = :loginId
        order by a.createdAt desc
    """)
    Page<Object[]> getFeed(Long loginId, Pageable pageable);

}
