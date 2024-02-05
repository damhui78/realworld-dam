package com.lodny.realworlddam.repository;

import com.lodny.realworlddam.entity.RealWorldUser;
import com.lodny.realworlddam.entity.dto.RegisterUserRequest;
import org.springframework.stereotype.Repository;

import java.util.HashMap;

@Repository
public class UserRepository {
    private Long sequence = 0L;
    private HashMap<Long, RealWorldUser> users = new HashMap<>();

    public RealWorldUser loginUser(RegisterUserRequest registerUserRequest) throws Exception {

         return users.values().stream()
                .filter(u -> u.getEmail().equals(registerUserRequest.email()) && u.getPassword().equals(registerUserRequest.password()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("not found"));
    }

    public void save(RegisterUserRequest registerUserRequest) throws Exception {
        RealWorldUser realWorldUser = new RealWorldUser();
        realWorldUser.setUsername(registerUserRequest.username());
        realWorldUser.setEmail(registerUserRequest.email());
        realWorldUser.setPassword(registerUserRequest.password());

        users.put(++sequence, realWorldUser);
    }

    public RealWorldUser getUser(String email) throws Exception {

        return users.values().stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("not found"));
    }

    public RealWorldUser getUser(Long userSeq) throws Exception {

        return users.get(userSeq);
    }

    public void deleteUser(Long userSeq) throws Exception {
        users.remove(userSeq);
    }
}
