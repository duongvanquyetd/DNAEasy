package com.dnaeasy.dnaeasy.dto.request;

import com.dnaeasy.dnaeasy.enums.GenderEnum;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateResquest {
    private String name;
    private String phone;
    private GenderEnum gender;
    private String city;
    private String district;
    private String streets;
    private String avatarUrl;
    private String email;
    private String oldpassword;
    private String newpassword;
}
