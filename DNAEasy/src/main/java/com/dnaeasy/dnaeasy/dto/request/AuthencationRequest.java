package com.dnaeasy.dnaeasy.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthencationRequest {
    @NotBlank(message = "Username not empty")
    String username;
    @NotBlank(message = "password not empty")
    String password;
}
