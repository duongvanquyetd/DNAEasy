package com.dnaeasy.dnaeasy.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    public String[] URL = {"/api/auth/*", "/api/payment/*"};
    @Autowired
    private CustomJwtDecoder jwtDecoder;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors(cors -> {
                });// ➕ Cho phép CORS


//là cái link sau localhost://8080 nha
        httpSecurity.authorizeHttpRequests(request ->
                request.requestMatchers(HttpMethod.POST, URL).permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/user/get").hasAnyAuthority("SCOPE_ADMIN")
                        .requestMatchers(HttpMethod.OPTIONS, "/api/auth/*").permitAll()
                        .anyRequest().authenticated()

        );
        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        httpSecurity.oauth2ResourceServer(oth2 ->
                oth2.jwt(jwtConfigurer ->
                        jwtConfigurer.decoder(jwtDecoder))
        );
        return httpSecurity.build();
    }


}