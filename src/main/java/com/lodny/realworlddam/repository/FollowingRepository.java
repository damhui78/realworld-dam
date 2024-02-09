package com.lodny.realworlddam.repository;

import com.lodny.realworlddam.entity.Following;
import com.lodny.realworlddam.entity.FollowingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FollowingRepository extends JpaRepository<Following, FollowingId> {
    List<Following> findByFollowingIdFollowerId(Long followerId);
}
