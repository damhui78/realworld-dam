package com.lodny.realworlddam.util;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "jwt")
public class JwtProperty {
    private Long expirationTime;
    private String secretKey;
    private String authTitle;
}

