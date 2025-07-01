package com.dnaeasy.dnaeasy.dto.request;

import com.dnaeasy.dnaeasy.enums.RoleName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequest {
    private int personId;
    private Boolean active;
    private RoleName role;
}
