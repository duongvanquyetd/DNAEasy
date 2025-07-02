package com.dnaeasy.dnaeasy.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RevenueStatsRequest {
    private String type;
    private LocalDate from;
    private LocalDate to;
    private Integer year;
} 