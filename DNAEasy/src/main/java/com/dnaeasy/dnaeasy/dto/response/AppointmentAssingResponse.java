package com.dnaeasy.dnaeasy.dto.response;

import com.dnaeasy.dnaeasy.enums.SampleMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentAssingResponse {

    private String serviceName;
    private String typeService;
    private String location;
    private LocalDateTime dateCollect;
    private SampleMethod typeCollect;
    private int appointmentId;
    private StaffResponse staffResponse;
}
