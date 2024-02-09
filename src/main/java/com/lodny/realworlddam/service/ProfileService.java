package com.lodny.realworlddam.service;

import com.lodny.realworlddam.entity.Following;
import com.lodny.realworlddam.entity.FollowingId;
import com.lodny.realworlddam.entity.RealWorldUser;
import com.lodny.realworlddam.entity.dto.ProfileResponse;
import com.lodny.realworlddam.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserService userService;
    private final ProfileRepository profileRepository;


    public ProfileResponse getProfile(String username, String auth) throws Exception {
        RealWorldUser realWorldUser = userService.getRealWorldUserByUsername(username);
        Boolean following = isFollowing(realWorldUser, auth);
        return ProfileResponse.builder()
                .username(realWorldUser.getUsername())
                .bio(realWorldUser.getBio())
                .image(realWorldUser.getImage())
                .following(following)
                .build();
    }

    private Boolean isFollowing(final RealWorldUser user, final String auth) {
        if (StringUtils.isBlank(auth)) return false;

        try {
            RealWorldUser loginUser = userService.getRealWorldUserByAuth(auth);
            if (user == null) return false;

            Following following = profileRepository.findById(new FollowingId(user.getId(), loginUser.getId()))
                    .orElseThrow(() -> new IllegalArgumentException("following not found"));
            return following != null;
        } catch (Exception e) {
            return false;
        }
    }

    public void saveFollowing(RealWorldUser realWorldUser, String auth) throws Exception {
        log.info("saveFollowing() : realWorldUser = {}", realWorldUser);
        log.info("saveFollowing() : auth = {}", auth);
        RealWorldUser loginUser = userService.getRealWorldUserByAuth(auth);

        profileRepository.save(Following.of(realWorldUser.getId(), loginUser.getId()));
    }

    public void deleteFollowing(RealWorldUser realWorldUser, String auth) throws Exception {
        log.info("deleteFollowing() : realWorldUser = {}", realWorldUser);
        log.info("deleteFollowing() : auth = {}", auth);
        RealWorldUser loginUser = userService.getRealWorldUserByAuth(auth);

        Following following = profileRepository.findById(new FollowingId(realWorldUser.getId(), loginUser.getId()))
                        .orElseThrow(() -> new IllegalArgumentException("following not found"));
        profileRepository.delete(following);
    }


}
