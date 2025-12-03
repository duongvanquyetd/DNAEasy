package com.dnaeasy.dnaeasy.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    public String[] URL = {"/api/auth/*", "/api/payment/*","/api/comments/*","/api/blog","/api/blog/*"
    ,"/api/service","/api/comments/*","/api/auth/*","/api/service","/api/service/*","/api/service/starAndNumber/*","/api/email/*","/oauth2/**","/api/auth/**"};


   private  String [] URLADMIN = {"/api/appointment/reportappointment","/api/appointment/stats","/api/appointment/recentappoint","/api/appointment/listreport","/api/appointment/topservice","/api/user/count-by-role","/api/user/filter","/api/appointment/statistics","/api/appointment/revenue-stats","/api/appointment/revenue_chart","/api/user/count-by-role","/api/payment/list"};

   private  String [] URLMANAGGE={"/api/blog/report","/api/blog/delete","/api/blog/active","/api/blog/create","/api/blog/update","/api/appointment/assignStaff","/api/appointment/managershift","/api/appointment/staffs","/api/comments/managercomment","/api/comments/commentReport"};
    @Autowired
    private CustomJwtDecoder jwtDecoder;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors(cors -> {
                });// ➕ Cho phép CORS


//là cái link sau localhost://8080 nha
        httpSecurity.authorizeHttpRequests(request -> {
            request.requestMatchers(URL).permitAll()
                    .requestMatchers("/websocket/**").permitAll()
                    .requestMatchers( URLADMIN).hasAnyAuthority("SCOPE_ADMIN")
                    .requestMatchers( URLMANAGGE).hasAnyAuthority("SCOPE_MANAGER")
                    .anyRequest().authenticated();


        } )
                .cors(customizer -> customizer.configurationSource(corsFilter()))
                .cors(customizer ->  customizer.configurationSource(corsFilter()))
                .oauth2Login(auth -> auth
                        .defaultSuccessUrl("/api/auth/login/google", true)

                );




        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        httpSecurity.oauth2ResourceServer(oth2 ->
                oth2.jwt(jwtConfigurer ->
                        jwtConfigurer.decoder(jwtDecoder))
        );
        return httpSecurity.build();
    }


    @Bean
    public CorsConfigurationSource corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
       config.setAllowCredentials(true);
       config.setAllowedOrigins(List.of("https://dna.library.id.vn","http://localhost:5173"));
       config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
       UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;

    }


}