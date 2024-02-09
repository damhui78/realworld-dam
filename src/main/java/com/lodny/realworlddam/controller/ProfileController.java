package com.lodny.realworlddam.controller;

import com.lodny.realworlddam.entity.RealWorldUser;
import com.lodny.realworlddam.service.ProfileService;
import com.lodny.realworlddam.service.UserService;
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
    public ResponseEntity<?> getProfile(@PathVariable String username, @RequestHeader(value = "Authorization", required = false) String auth) throws Exception {
        log.info("getProfile() : username = {}", username);
        log.info("getProfile() : auth = {}", auth);

        return ResponseEntity.ok(profileService.getProfile(username, auth));
    }

    @PostMapping("/{username}/follow")
    public ResponseEntity<?> saveFollowing(@PathVariable String username, @RequestHeader(value = "Authorization") String auth) throws Exception {
        log.info("saveFollowing() : username = {}", username);
        log.info("saveFollowing() : auth = {}", auth);

        RealWorldUser followee = userService.getRealWorldUserByUsername(username);

        return ResponseEntity.ok(profileService.follow(followee, auth));
    }

    @DeleteMapping("/{username}/follow")
    public ResponseEntity<?> deleteFollowing(@PathVariable String username, @RequestHeader(value = "Authorization") String auth) throws Exception {
        log.info("deleteFollowing() : username = {}", username);
        log.info("deleteFollowing() : auth = {}", auth);

        RealWorldUser followee = userService.getRealWorldUserByUsername(username);

        return ResponseEntity.ok(profileService.unfollow(followee, auth));
    }

}
