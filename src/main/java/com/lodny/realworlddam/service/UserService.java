package com.lodny.realworlddam.service;

import com.lodny.realworlddam.entity.RealWorldUser;
import com.lodny.realworlddam.entity.dto.LoginUserResponse;
import com.lodny.realworlddam.entity.dto.RegisterUserRequest;
import com.lodny.realworlddam.entity.dto.UpdateUserRequest;
import com.lodny.realworlddam.repository.UserRepository;
import com.lodny.realworlddam.system.RealException;
import com.lodny.realworlddam.util.JwtProperty;
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
    private final JwtProperty jwtProperty;

    public LoginUserResponse loginUser(RegisterUserRequest registerUserRequest) {
        log.info("loginUser() : registerUserRequest = {}", registerUserRequest);

        RealWorldUser realWorldUser = userRepository.findByEmail(registerUserRequest.email());
        if (realWorldUser == null || !registerUserRequest.password().equals(realWorldUser.getPassword()))
            throw new RealException("invalid email or password");

        String jwt = jwtUtil.createJwt(realWorldUser.getEmail());

        return LoginUserResponse.of(realWorldUser, jwt);
    }

    public void registerUser(RegisterUserRequest registerUserRequest) {
        log.info("registerUser() : registerUserRequest = {}", registerUserRequest);

        RealWorldUser realWorldUser = RealWorldUser.of(registerUserRequest);
        userRepository.save(realWorldUser);
    }

    public LoginUserResponse updateUser(UpdateUserRequest updateUserRequest, final String auth, RealWorldUser loginUser) {
        log.info("updateUser() : updateUserRequest = {}", updateUserRequest);

        loginUser.update(updateUserRequest);
        userRepository.save(loginUser);
//        userRepository.update(loginUser);

        return getLoginUserResponse(auth, loginUser);
    }

    public LoginUserResponse getLoginUser(String auth, RealWorldUser loginUser) {

        return getLoginUserResponse(auth, loginUser);
    }
    public RealWorldUser getUser(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found"));
    }

    public RealWorldUser getRealWorldUserByAuth(final String auth) {
        String emailByJwt = jwtUtil.getEmailByJwt(auth);
        return userRepository.findByEmail(emailByJwt);
    }

    public RealWorldUser getRealWorldUserByUsername(final String username) {
        return userRepository.findByUsername(username);
    }



    // -----------------------------------------------------------------------------------------------------------------
    private LoginUserResponse getLoginUserResponse(final String auth, final RealWorldUser realWorldUser) {
        String jwt = auth.substring(jwtProperty.getAuthTitle().length());
        return LoginUserResponse.of(realWorldUser, jwt);
    }

}
