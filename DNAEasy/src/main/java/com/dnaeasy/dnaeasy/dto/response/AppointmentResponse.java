package com.dnaeasy.dnaeasy.dto.response;

import com.dnaeasy.dnaeasy.enums.PaymentMehtod;
import com.dnaeasy.dnaeasy.enums.SampleMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentResponse {
    private int appointmentId;
    private String serviceName;
    private String typeService;
    private String location;
    private LocalDateTime dateCollect;
    private String note;
    private SampleMethod typeCollect;
    private String curentStatusAppointment;
    private PaymentMehtod paymentMethod;
    private String customerName;
    private String staffName;
    private BigDecimal paymentAmount;
    private String phoneAppointment;
    private String  emailAppointment;
    private Boolean paymentStatus;
    List<SampleResponse> listSample;
    List<AppointmentTrackingResponse> tracking;

}
