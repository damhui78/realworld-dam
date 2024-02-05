package com.lodny.realworlddam.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;


@Component
public class JwtUtil {
    @Value("${jwt.secret_key}")
    private String secretKey;
    @Value("${jwt.expiration_time}")
    private Long expirationTime;
    @Value("${jwt.auth_title}")
    @Getter
    private String authTitle;

    public String createJwt(String email) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + expirationTime);
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

        return Jwts.builder()
                .setSubject(email)
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String getSubjectByJwt(String jwt) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody()
                .getSubject();
    }

    public boolean isValidJwt(String jwt) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();

            // Check expiration
            Date expiration = claims.getExpiration();
            Date now = new Date();
            if (expiration != null && expiration.before(now)) {
                System.out.println("JWT has expired");
                return false;
            }

            return true;
        } catch (Exception e) {
            // Handle parsing exception or invalid signature
            e.printStackTrace();
            return false;
        }
    }

    public String getEmailByJwt(String auth) {
        if (auth == null || !auth.startsWith(authTitle)) throw new IllegalArgumentException("auth not found");

        String jwt = auth.substring(authTitle.length());

        isValidJwt(jwt);

        return getSubjectByJwt(jwt);
    }

}
