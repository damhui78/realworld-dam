package com.lodny.realworlddam.system;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class WebConfig {
    private final JwtFilter jwtFilter;

    @Bean
    public FilterRegistrationBean<JwtFilter> addJwtFilter() {
        FilterRegistrationBean<JwtFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(jwtFilter);
        registrationBean.addUrlPatterns("/api/*"); // 필터를 어느 URL 패턴에 적용할지 설정
        return registrationBean;
    }
}
