package com.dnaeasy.dnaeasy.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFilterRequest {
    private String name;
    private String rolename;
    private Boolean active;
    private String createdDateform;
    private String createdDateTo;
}
