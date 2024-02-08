package com.lodny.realworlddam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Following {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long followeeId;
    private Long followerId;


    public static Following of(Long followeeId, Long followerId) {
        return new Following(
                0L,
                followeeId,
                followerId
        );
    }

}
