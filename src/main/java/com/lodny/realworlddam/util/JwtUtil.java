package com.lodny.realworlddam.util;

import com.lodny.realworlddam.entity.RealWorldUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtProperty jwtProperty;
    private static Map<String, RealWorldUser> loginUsers = new HashMap<>();

    public String createJwt(String email) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + jwtProperty.getExpirationTime());
        Key key = Keys.hmacShaKeyFor(jwtProperty.getSecretKey().getBytes());

        return Jwts.builder()
                .setSubject(email)
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String getSubjectByJwt(String jwt) {
        Key key = Keys.hmacShaKeyFor(jwtProperty.getSecretKey().getBytes());

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody()
                .getSubject();
    }

    public boolean isValidJwt(String jwt) {
        Key key = Keys.hmacShaKeyFor(jwtProperty.getSecretKey().getBytes());

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
        String authTitle = jwtProperty.getAuthTitle();
        if (auth == null || !auth.startsWith(authTitle)) throw new IllegalArgumentException("auth not found");

        String jwt = auth.substring(authTitle.length());

        isValidJwt(jwt);

        return getSubjectByJwt(jwt);
    }

    public RealWorldUser getLoginUser(String sessionId) {

        return loginUsers.get(sessionId);
    }
    public void setLoginUser(String sessionId, RealWorldUser user) {

        loginUsers.put(sessionId, user);
    }
    public void removeLoginUser(String sessionId) {

        loginUsers.remove(sessionId);
    }

}
