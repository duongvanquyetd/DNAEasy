package com.dnaeasy.dnaeasy.config;

import com.dnaeasy.dnaeasy.dto.request.IntrospectRequest;
import com.dnaeasy.dnaeasy.service.AuthencationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.AbstractConfiguredSecurityBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    public String[] URL = {"/api/auth/*"};
    @Autowired
   private CustomJwtDecoder jwtDecoder;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

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