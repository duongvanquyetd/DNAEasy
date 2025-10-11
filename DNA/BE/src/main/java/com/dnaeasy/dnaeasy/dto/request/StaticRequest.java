package com.dnaeasy.dnaeasy.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StaticRequest {
    private LocalDate startDate;
    private LocalDate endDate;
    private String startPeriod;
    private String endPeriod;
}
