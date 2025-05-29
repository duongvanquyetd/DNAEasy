package com.dnaeasy.dnaeasy.dto.response;

import com.dnaeasy.dnaeasy.enums.SampleMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentCreateResponse {
    private String  serviceName;
    private String location;
    private LocalDateTime dateCollect;
    private String note;
    private SampleMethod typeCollect;
    private String curentStatusAppointment;
    private String  paymentMethod;
    private String customerName;
    private String staffName;
    private Map<String, LocalDateTime> tracking;
    private BigDecimal paymentAmount;


}
