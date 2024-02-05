package com.lodny.realworlddam.service;

import com.lodny.realworlddam.entity.RealWorldUser;
import com.lodny.realworlddam.entity.dto.LoginUserResponse;
import com.lodny.realworlddam.entity.dto.RegisterUserRequest;
import com.lodny.realworlddam.entity.dto.UpdateUserRequest;
import com.lodny.realworlddam.repository.UserRepository;
import com.lodny.realworlddam.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public LoginUserResponse loginUser(RegisterUserRequest registerUserRequest) throws Exception {
        log.info("loginUser() : registerUserRequest = {}", registerUserRequest);

        RealWorldUser realWorldUser = userRepository.findByEmail(registerUserRequest.email());
        if (! registerUserRequest.password().equals(realWorldUser.getPassword()))
            throw new IllegalArgumentException("invalid username or password");

        String jwt = jwtUtil.createJwt(realWorldUser.getEmail());

        return LoginUserResponse.builder()
                .email(realWorldUser.getEmail())
                .token(jwt)
                .username(realWorldUser.getUsername())
                .bio(realWorldUser.getBio())
                .image(realWorldUser.getImage())
                .build();
    }

    public void registerUser(RegisterUserRequest registerUserRequest) throws Exception {
        log.info("registerUser() : registerUserRequest = {}", registerUserRequest);

        RealWorldUser realWorldUser = RealWorldUser.of(registerUserRequest);
        userRepository.save(realWorldUser);
    }

    public LoginUserResponse updateUser(UpdateUserRequest updateUserRequest, final String auth) throws Exception {
        log.info("updateUser() : updateUserRequest = {}", updateUserRequest);

        RealWorldUser realWorldUser = getRealWorldUser(auth);

        realWorldUser.update(updateUserRequest);
        userRepository.update(realWorldUser);

        return getLoginUserResponse(auth, realWorldUser);
    }

    public LoginUserResponse getUser(String auth) throws Exception {

        RealWorldUser realWorldUser = getRealWorldUser(auth);
        return getLoginUserResponse(auth, realWorldUser);
    }

    private RealWorldUser getRealWorldUser(final String auth) {
        String emailByJwt = jwtUtil.getEmailByJwt(auth);
        return userRepository.findByEmail(emailByJwt);
    }

    private LoginUserResponse getLoginUserResponse(final String auth, final RealWorldUser realWorldUser) {
        String jwt = auth.substring(jwtUtil.getAuthTitle().length());
        return LoginUserResponse.builder()
                .email(realWorldUser.getEmail())
                .token(jwt)
                .username(realWorldUser.getUsername())
                .bio(realWorldUser.getBio())
                .image(realWorldUser.getImage())
                .build();
    }
}
