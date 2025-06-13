package com.dnaeasy.dnaeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentTrackingResponse {

    private String StatusName;
    private LocalDateTime StatusDate; //sample // result //appointment
    private String imageUrl;
}
