package com.lodny.realworlddam.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;


@Component
public class JwtUtil {
    @Value("${jwt.secret_key}")
    private String SECRET_KEY;
    @Value("${jwt.expiration_time}")
    private long EXPIRATION_TIME;
    @Value("${jwt.auth_title}")
    private String AUTH_TITLE;

    public String createJwt(String email) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + EXPIRATION_TIME);
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

        return Jwts.builder()
                .setSubject(email)
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String getSubjectByJwt(String jwt) {
        SecretKey secretKey = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(jwt)
                .getBody()
                .getSubject();
    }

    public boolean isValidJwt(String jwt) {
        SecretKey secretKey = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
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
        if (auth == null || !auth.startsWith(AUTH_TITLE)) throw new IllegalArgumentException("auth not found");

        String jwt = auth.substring(AUTH_TITLE.length());

        isValidJwt(jwt);

        return getSubjectByJwt(jwt);
    }

}
