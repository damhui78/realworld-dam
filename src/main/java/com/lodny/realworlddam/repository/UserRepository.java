package com.lodny.realworlddam.repository;

import com.lodny.realworlddam.entity.RealWorldUser;
import com.lodny.realworlddam.entity.dto.RegisterUserRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;


@Repository
public interface UserRepository extends JpaRepository<RealWorldUser, Long> {
    RealWorldUser findByEmail(String email);
    RealWorldUser findByUsername(String username);


    /*
    private Long sequence = 0L;
    private HashMap<Long, RealWorldUser> users = new HashMap<>();

    public RealWorldUser findByEmail(final String email) {
        return users.values().stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("not found"));
    }

    public RealWorldUser loginUser(RegisterUserRequest registerUserRequest) {

         return users.values().stream()
                .filter(u -> u.getEmail().equals(registerUserRequest.email()) && u.getPassword().equals(registerUserRequest.password()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("not found"));
    }

    public void save(RealWorldUser realWorldUser) {
        realWorldUser.setId(++sequence);
        users.put(realWorldUser.getId(), realWorldUser);
    }

    public void update(RealWorldUser realWorldUser) {
        log.info("update() : realWorldUser = {}", realWorldUser);

        Map.Entry<Long, RealWorldUser> foundEntry = users.entrySet().stream()
                .filter(entry -> {
                    RealWorldUser user = entry.getValue();
                    return user.getEmail().equals(realWorldUser.getEmail());
                })
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("not found"));

        users.put(foundEntry.getKey(), realWorldUser);
    }

    public RealWorldUser getUser(Long userSeq) {

        return users.get(userSeq);
    }

    public void deleteUser(Long userSeq) {
        users.remove(userSeq);
    }
    */
}
