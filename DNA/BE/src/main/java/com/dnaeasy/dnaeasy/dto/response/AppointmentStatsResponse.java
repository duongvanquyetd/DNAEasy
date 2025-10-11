package com.dnaeasy.dnaeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentStatsResponse {
    private int total;
    private int completed;
    private int inProgress;
    private int cancelled;
    private int refunded;
} 