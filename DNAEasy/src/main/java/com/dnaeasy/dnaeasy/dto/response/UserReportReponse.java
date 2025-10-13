package com.dnaeasy.dnaeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserReportReponse {
    private int personId;
    private String name;
    private String district;
    private String email;
    private String city;
    private String phone;
    private String role;
    private LocalDate createDate;
}
