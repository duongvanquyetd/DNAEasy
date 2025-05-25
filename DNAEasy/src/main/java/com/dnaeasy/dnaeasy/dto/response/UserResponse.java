package com.dnaeasy.dnaeasy.dto.response;


import com.dnaeasy.dnaeasy.enums.GenderEnum;
import com.dnaeasy.dnaeasy.enums.RoleName;
import com.dnaeasy.dnaeasy.enums.Work_hour;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Data



public class UserResponse {

    private String name;
    private String phone;
    private GenderEnum gender;
    private String address;

    //    private byte[] avatar;
    private String avatarUrl;
    private String email;
    private String token;

}
