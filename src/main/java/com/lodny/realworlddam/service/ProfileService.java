package com.lodny.realworlddam.service;

import com.lodny.realworlddam.entity.Following;
import com.lodny.realworlddam.entity.FollowingId;
import com.lodny.realworlddam.entity.RealWorldUser;
import com.lodny.realworlddam.entity.dto.ProfileResponse;
import com.lodny.realworlddam.repository.FollowingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
    public ProfileResponse getProfile(String username, String auth) {
        RealWorldUser followee = userService.getRealWorldUserByUsername(username);
        return getProfileResponse(followee, isFollowing(followee, auth));
    }

    public ProfileResponse follow(RealWorldUser followee, String auth) {
        log.info("follow() : followee = {}", followee);
        log.info("follow() : auth = {}", auth);

        RealWorldUser follower = userService.getRealWorldUserByAuth(auth);
        followingRepository.save(Following.of(followee.getId(), follower.getId()));

        return getProfileResponse(followee, true);
    }

    public ProfileResponse unfollow(RealWorldUser followee, String auth) {
        log.info("unfollow() : followee = {}", followee);
        log.info("unfollow() : auth = {}", auth);

        RealWorldUser follower = userService.getRealWorldUserByAuth(auth);
        followingRepository.deleteById(new FollowingId(followee.getId(), follower.getId()));

        return getProfileResponse(followee, false);
    }



    // -----------------------------------------------------------------------------------------------------------------
    private Boolean isFollowing(final RealWorldUser user, final String auth) {
        if (user == null) return false;
        if (StringUtils.isBlank(auth)) return false;

        RealWorldUser loginUser = userService.getRealWorldUserByAuth(auth);

        return followingRepository
                .findById(new FollowingId(user.getId(), loginUser.getId()))
                .isPresent();
    }

    private ProfileResponse getProfileResponse(final RealWorldUser followee, final Boolean following) {
        return ProfileResponse.builder()
                .username(followee.getUsername())
                .bio(followee.getBio())
                .image(followee.getImage())
                .following(following)
                .build();
    }
}
