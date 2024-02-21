package com.lodny.realworlddam.service;

import com.lodny.realworlddam.entity.Following;
import com.lodny.realworlddam.entity.FollowingId;
import com.lodny.realworlddam.entity.RealWorldUser;
import com.lodny.realworlddam.entity.dto.ProfileResponse;
import com.lodny.realworlddam.repository.FollowingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserService userService;
    private final FollowingRepository followingRepository;


    public ProfileResponse getProfile(String username) {
        RealWorldUser followee = userService.getRealWorldUserByUsername(username);
        return getProfileResponse(followee, false);
    }
    public ProfileResponse getProfile(String username, RealWorldUser loginUser) {
        RealWorldUser followee = userService.getRealWorldUserByUsername(username);
        return getProfileResponse(followee, isFollowing(followee, loginUser));
    }

    public ProfileResponse follow(RealWorldUser followee, RealWorldUser follower) {
        log.info("follow() : followee = {}", followee);

        followingRepository.save(Following.of(followee.getId(), follower.getId()));

        return getProfileResponse(followee, true);
    }

    public ProfileResponse unfollow(RealWorldUser followee, RealWorldUser follower) {
        log.info("unfollow() : followee = {}", followee);

        followingRepository.deleteById(new FollowingId(followee.getId(), follower.getId()));

        return getProfileResponse(followee, false);
    }



    // -----------------------------------------------------------------------------------------------------------------
    private Boolean isFollowing(final RealWorldUser user, final RealWorldUser loginUser) {
        if (user == null || loginUser == null) return false;

        return followingRepository
                .findById(new FollowingId(user.getId(), loginUser.getId()))
                .isPresent();
    }

    private ProfileResponse getProfileResponse(final RealWorldUser followee, final Boolean following) {
        return ProfileResponse.of(followee, following);
    }

}
