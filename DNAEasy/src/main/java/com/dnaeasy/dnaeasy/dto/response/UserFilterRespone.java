package com.dnaeasy.dnaeasy.dto.response;

import com.dnaeasy.dnaeasy.enums.RoleName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFilterRespone {
    private int personId;
    private String name;
    private RoleName rolename;
    private boolean active;
    private LocalDateTime createdDate;
    private String avatarUrl;
}
