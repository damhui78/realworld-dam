package com.lodny.realworlddam.controller;

import com.lodny.realworlddam.entity.RealWorldUser;
import com.lodny.realworlddam.entity.dto.LoginUserResponse;
import com.lodny.realworlddam.entity.dto.RegisterUserRequest;
import com.lodny.realworlddam.entity.dto.UpdateUserRequest;
import com.lodny.realworlddam.entity.wrapper.LoginUserResponseWrapper;
import com.lodny.realworlddam.entity.wrapper.RegisterUserRequestWrapper;
import com.lodny.realworlddam.entity.wrapper.UpdateUserRequestWrapper;
import com.lodny.realworlddam.service.UserService;
import com.lodny.realworlddam.system.JwtSecured;
import com.lodny.realworlddam.system.LoginUser;
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
                .body(new LoginUserResponseWrapper(loginUserResponse));
    }

    @PostMapping("/users/login")
    public ResponseEntity<?> loginUser(@RequestBody RegisterUserRequestWrapper registerUserRequestWrapper) {
        RegisterUserRequest registerUserRequest = registerUserRequestWrapper.user();
        log.info("loginUser() : registerUserRequest = {}", registerUserRequest);

        return ResponseEntity.ok(new LoginUserResponseWrapper(userService.loginUser(registerUserRequest)));
    }

    @JwtSecured
    @PutMapping("/user")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserRequestWrapper updateUserRequestWrapper,
                                        @LoginUser RealWorldUser loginUser,
                                        @RequestHeader("Authorization") String auth) {
        UpdateUserRequest updateUserRequest = updateUserRequestWrapper.user();
        log.info("updateUser() : updateUserRequest = {}", updateUserRequest);

        return ResponseEntity.ok(new LoginUserResponseWrapper(userService.updateUser(updateUserRequest, auth, loginUser)));
    }

    @JwtSecured
    @GetMapping("/user")
    public ResponseEntity<?> getLoginUser(@LoginUser RealWorldUser loginUser, @RequestHeader("Authorization") String auth) {
        log.info("getUser() : auth = {}", auth);

        return ResponseEntity.ok(new LoginUserResponseWrapper(userService.getLoginUser(auth, loginUser)));
    }

}
