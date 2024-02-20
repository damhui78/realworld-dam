package com.lodny.realworlddam.system;

import com.lodny.realworlddam.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.lang.annotation.Annotation;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtInterceptor implements HandlerInterceptor {
    private final JwtUtil jwtUtil;

    @Override
    public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler) throws Exception {
        if (handler instanceof HandlerMethod handlerMethod) {
//            // 컨트롤러 클래스 이름
//            Class<?> controllerClass = handlerMethod.getBeanType();
//            log.info("preHandle() : controllerClass.getName() = {}", controllerClass.getName());
//
//            // 컨트롤러 메서드 이름
//            String methodName = handlerMethod.getMethod().getName();
//            log.info("preHandle() : methodName = {}", methodName);

            Annotation methodAnnotation = handlerMethod.getMethodAnnotation(JwtSecured.class);
            log.info("preHandle() : methodAnnotation = {}", methodAnnotation);
            String sessionId = request.getSession().getId();
            // handlerMethod.getMethod().isAnnotationPresent(JwtSecured.class)
            if (methodAnnotation != null && jwtUtil.getLoginUser(sessionId) == null) {
                throw new IllegalArgumentException("token required");
            }
        }

        return true;
    }
}
