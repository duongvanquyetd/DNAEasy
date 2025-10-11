package com.dnaeasy.dnaeasy.dto.request;

import com.dnaeasy.dnaeasy.enums.RoleName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFilterRequest {
    private String name;
    private String rolename;
    private Boolean active;
    private LocalDate createdDateform;
    private LocalDate createdDateTo;
}
