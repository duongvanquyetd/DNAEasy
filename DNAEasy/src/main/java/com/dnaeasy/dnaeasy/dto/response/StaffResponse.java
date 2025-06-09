package com.dnaeasy.dnaeasy.dto.response;

import com.dnaeasy.dnaeasy.enums.GenderEnum;
import com.dnaeasy.dnaeasy.enums.RoleName;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StaffResponse {
    private String personId;
    private String phone;
    private GenderEnum gender;
    private String address;//city + streets + city
    private String work_hour;
    private RoleName rolename;
    private String avatarUrl;
    private String email;
//    private String departmentName;
}
