package com.lodny.realworlddam.controller;

import com.lodny.realworlddam.entity.dto.RegisterUserRequestWrapper;
import com.lodny.realworlddam.service.UserService;
import com.lodny.realworlddam.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;


    @PostMapping("users/login")
    public ResponseEntity<?> loginUser(@RequestBody RegisterUserRequestWrapper registerUserRequestWrapper) throws Exception {

        return ResponseEntity.ok(userService.loginUser(registerUserRequestWrapper.user()));
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(@RequestHeader("Authorization") String auth) throws Exception {

        return ResponseEntity.ok(userService.getUser(auth));
    }

    @GetMapping("/user/{userSeq}")
    public ResponseEntity<?> getUser(@PathVariable Long userSeq) throws Exception {

        return ResponseEntity.ok(userService.getUser(userSeq));
    }

    @PostMapping("/user")
    public ResponseEntity<String> registUser(@RequestBody RegisterUserRequestWrapper registerUserRequestWrapper) throws Exception {
        userService.registUser(registerUserRequestWrapper.user());

        return ResponseEntity.ok("ok");
    }

    @DeleteMapping("/user")
    public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String auth, Long userSeq) throws Exception {
        if (StringUtils.isBlank(jwtUtil.getEmailByJwt(auth))) return ResponseEntity.ok("로그인 필요");


        userService.deleteUser(userSeq);

        return ResponseEntity.ok("ok");
    }

}
