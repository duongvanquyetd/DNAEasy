package com.dnaeasy.dnaeasy.dto.response;


import com.dnaeasy.dnaeasy.enums.GenderEnum;
import com.dnaeasy.dnaeasy.enums.RoleName;
import com.dnaeasy.dnaeasy.enums.Work_hour;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserResponse {

    private int personId;
    private String name;
    private String phone;
    private GenderEnum gender;
    private String address;
    private String avatarUrl;
    private String email;
    private Work_hour work_hour;
    private RoleName rolename;
    private String typeLogin;


}
