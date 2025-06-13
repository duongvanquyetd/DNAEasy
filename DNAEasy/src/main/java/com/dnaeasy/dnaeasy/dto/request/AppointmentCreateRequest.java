package com.dnaeasy.dnaeasy.dto.request;

import com.dnaeasy.dnaeasy.enums.PaymentMehtod;
import com.dnaeasy.dnaeasy.enums.SampleMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentCreateRequest {
    private int serviceid;
    private String location;
    private LocalDateTime dateCollect;
    private String note;
    private SampleMethod typeCollect;
    private PaymentMehtod paymentMethod;
    private String  phoneAppointment;
    private String  emailAppointment;

}
