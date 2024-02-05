package com.lodny.realworlddam.service;

import com.lodny.realworlddam.entity.RealWorldUser;
import com.lodny.realworlddam.entity.dto.LoginUserResponse;
import com.lodny.realworlddam.entity.dto.RegisterUserRequest;
import com.lodny.realworlddam.entity.dto.RegisterUserResponse;
import com.lodny.realworlddam.repository.UserRepository;
import com.lodny.realworlddam.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public LoginUserResponse loginUser(RegisterUserRequest registerUserRequest) throws Exception {

        RealWorldUser realWorldUser = userRepository.loginUser(registerUserRequest);

        String jwt = jwtUtil.createJwt(realWorldUser.getEmail());

        return LoginUserResponse.builder()
                .email(realWorldUser.getEmail())
                .token(jwt)
                .username(realWorldUser.getUsername())
                .bio(realWorldUser.getBio())
                .image(realWorldUser.getImage())
                .build();
    }

    public void registUser(RegisterUserRequest registerUserRequest) throws Exception {

        userRepository.save(registerUserRequest);
    }

    public LoginUserResponse getUser(String auth) throws Exception {

        String emailByJwt = jwtUtil.getEmailByJwt(auth);

        RealWorldUser realWorldUser = userRepository.getUser(emailByJwt);

        String jwt = auth.substring(jwtUtil.getAuthTitle().length());

        return LoginUserResponse.builder()
                .email(realWorldUser.getEmail())
                .token(jwt)
                .username(realWorldUser.getUsername())
                .bio(realWorldUser.getBio())
                .image(realWorldUser.getImage())
                .build();
    }

    public RegisterUserResponse getUser(Long userSeq) throws Exception {

        RealWorldUser realWorldUser = userRepository.getUser(userSeq);

        if (realWorldUser == null) throw new IllegalArgumentException("not found");

        return RegisterUserResponse.builder()
                .username(realWorldUser.getUsername())
                .email(realWorldUser.getEmail())
                .build();
    }

    public void deleteUser(Long userSeq) throws Exception {

        userRepository.deleteUser(userSeq);
    }
}
