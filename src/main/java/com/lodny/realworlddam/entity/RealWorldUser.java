package com.lodny.realworlddam.entity;

import lombok.Data;

@Data
public class RealWorldUser {

    private String username;
    private String email;
    private String password;
    private String bio;
    private String image;

}
