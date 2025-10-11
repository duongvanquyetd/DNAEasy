package com.dnaeasy.dnaeasy.dto.response;

import com.dnaeasy.dnaeasy.enums.GenderEnum;
import com.dnaeasy.dnaeasy.enums.RoleName;
import com.dnaeasy.dnaeasy.enums.Work_hour;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Data

public class AuthenctionResponse {

    private String token;
    private RoleName rolename;

}
