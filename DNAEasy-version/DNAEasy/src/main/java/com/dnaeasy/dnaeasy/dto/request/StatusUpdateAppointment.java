package com.dnaeasy.dnaeasy.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatusUpdateAppointment {
    private int appointmentId;
    private String stautus;
    private String note;
}
