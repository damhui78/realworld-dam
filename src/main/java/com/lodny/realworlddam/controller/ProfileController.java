package com.lodny.realworlddam.controller;

import com.lodny.realworlddam.entity.RealWorldUser;
import com.lodny.realworlddam.entity.wrapper.ProfileResponseWrapper;
import com.lodny.realworlddam.service.ProfileService;
import com.lodny.realworlddam.service.UserService;
import com.lodny.realworlddam.system.JwtSecured;
import com.lodny.realworlddam.system.LoginUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profiles")
@Slf4j
public class ProfileController {

    private final UserService userService;
    private final ProfileService profileService;

    @GetMapping("/{username}")
    public ResponseEntity<?> getProfile(@PathVariable String username, @LoginUser RealWorldUser loginUser) {
        log.info("getProfile() : username = {}", username);

        return ResponseEntity.ok(new ProfileResponseWrapper(profileService.getProfile(username, loginUser)));
    }

    @JwtSecured
    @PostMapping("/{username}/follow")
    public ResponseEntity<?> saveFollowing(@PathVariable String username, @LoginUser RealWorldUser loginUser) {
        log.info("saveFollowing() : username = {}", username);

        RealWorldUser followee = userService.getRealWorldUserByUsername(username);

        return ResponseEntity.ok(new ProfileResponseWrapper(profileService.follow(followee, loginUser)));
    }

    @JwtSecured
    @DeleteMapping("/{username}/follow")
    public ResponseEntity<?> deleteFollowing(@PathVariable String username, @LoginUser RealWorldUser loginUser) {
        log.info("deleteFollowing() : username = {}", username);

        RealWorldUser followee = userService.getRealWorldUserByUsername(username);

        return ResponseEntity.ok(new ProfileResponseWrapper(profileService.unfollow(followee, loginUser)));
    }

}
