package com.dnaeasy.dnaeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentReportResponse {
    LocalDate appointmentDate;
    Long inprocess;
    Long complete;
    Long refunded;
    Long cancle;
}
