package com.lodny.realworlddam.repository;

import com.lodny.realworlddam.entity.Following;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProfileRepository extends JpaRepository<Following, Long> {
    Following findByFolloweeIdAndFollowerId(Long followeeId, Long followerId);
}
