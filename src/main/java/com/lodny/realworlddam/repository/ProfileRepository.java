package com.lodny.realworlddam.repository;

import com.lodny.realworlddam.entity.Following;
import com.lodny.realworlddam.entity.FollowingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProfileRepository extends JpaRepository<Following, FollowingId> {
}
