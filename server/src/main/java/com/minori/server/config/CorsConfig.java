package com.minori.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Allow credentials
        config.setAllowCredentials(true);

        // Allow specific origins
        // Note: Using allowedOrigins instead of Pattern for explicit trust
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        
        // Allow all headers
        config.addAllowedHeader("*");
        
        // Allow all methods
        config.addAllowedMethod("*");
        
        // Expose headers
        config.addExposedHeader("Set-Cookie");
        config.addExposedHeader("Authorization");
        
        source.registerCorsConfiguration("/**", config);
        return source;
    }
} 
