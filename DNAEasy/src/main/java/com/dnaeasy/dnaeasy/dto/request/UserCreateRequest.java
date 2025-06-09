package com.dnaeasy.dnaeasy.dto.request;

import com.dnaeasy.dnaeasy.enums.GenderEnum;
import com.dnaeasy.dnaeasy.enums.RoleName;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCreateRequest {
    @NotBlank(message = "name is not empty")
    private String name;
    @NotBlank(message = "phone is not empty")
    @Pattern(regexp = "^(84|0[3|5|7|8|9])+([0-9]{8})$")
    private String phone;

    private GenderEnum gender;
    @NotBlank(message = "city is not empty")
    private String city;
    @NotBlank(message = "district is not empty")
    private String district;
    @NotBlank(message = "streets is not empty")
    private String streets;
    @NotBlank(message = "username is not empty")
    private String username;
//    @JsonIgnore
//    private byte[] avatar;

   private String avatarUrl;
    @NotBlank(message = "name is not empty")
    @Email(message = "Email is not a Format")
    private String email;
    @NotBlank(message = "password is not empty")
    private String password;
}
