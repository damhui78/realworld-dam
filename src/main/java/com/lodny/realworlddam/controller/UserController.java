package com.lodny.realworlddam.controller;

import com.lodny.realworlddam.entity.dto.*;
import com.lodny.realworlddam.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserRequestWrapper registerUserRequestWrapper) {
        RegisterUserRequest registerUserRequest = registerUserRequestWrapper.user();
        log.info("registerUser() : registerUserRequest = {}", registerUserRequest);

        userService.registerUser(registerUserRequest);

        LoginUserResponse loginUserResponse = userService.loginUser(registerUserRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(loginUserResponse);
    }

    @PostMapping("/users/login")
    public ResponseEntity<?> loginUser(@RequestBody RegisterUserRequestWrapper registerUserRequestWrapper) {
        RegisterUserRequest registerUserRequest = registerUserRequestWrapper.user();
        log.info("loginUser() : registerUserRequest = {}", registerUserRequest);

        return ResponseEntity.ok(userService.loginUser(registerUserRequest));
    }

    @PutMapping("/user")
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String auth, @RequestBody UpdateUserRequestWrapper updateUserRequestWrapper) {
        UpdateUserRequest updateUserRequest = updateUserRequestWrapper.user();
        log.info("updateUser() : updateUserRequest = {}", updateUserRequest);

        return ResponseEntity.ok(userService.updateUser(updateUserRequest, auth));
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(@RequestHeader("Authorization") String auth) {
        log.info("getUser() : auth = {}", auth);

        return ResponseEntity.ok(userService.getUser(auth));
    }

}
