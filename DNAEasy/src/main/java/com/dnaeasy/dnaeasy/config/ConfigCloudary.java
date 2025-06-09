package com.dnaeasy.dnaeasy.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class ConfigCloudary {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, Object> config = new HashMap<String, Object>();
        config.put("cloud_name", "dy3uhobsq");
        config.put("api_key", "826823998447368");
        config.put("api_secret", "adz3cVPKZR3lxDGqhaBVIbZEdL0");
        return new Cloudinary(config);
    }
}
