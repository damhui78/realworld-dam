package com.lodny.realworlddam.system;

import com.lodny.realworlddam.entity.RealWorldUser;
import com.lodny.realworlddam.service.UserService;
import com.lodny.realworlddam.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response, final FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        log.info("doFilterInternal() : authorization = {}", authorization);

        if (authorization == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String sessionId = request.getSession().getId();

        RealWorldUser realWorldUserByAuth = userService.getRealWorldUserByAuth(authorization);
        log.info("doFilterInternal() : realWorldUserByAuth = {}", realWorldUserByAuth);
        jwtUtil.setLoginUser(sessionId, realWorldUserByAuth);

        filterChain.doFilter(request, response);

        jwtUtil.removeLoginUser(sessionId);
    }
}
