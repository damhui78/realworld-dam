package com.lodny.realworlddam.repository;

import com.lodny.realworlddam.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("""
        select c, u, f
        from Comment c
        join RealWorldUser u on u.id = c.authorId
        join Article a on a.id = c.articleId
        left join Following f on f.followingId.followeeId = c.authorId and f.followingId.followerId = :loginId
        where a.slug = :slug
        order by c.createdAt desc
    """)
    List<Object[]> commentsBySlug(String slug, Long loginId);

}
