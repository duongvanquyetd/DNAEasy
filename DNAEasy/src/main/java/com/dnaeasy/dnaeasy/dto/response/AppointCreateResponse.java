package com.dnaeasy.dnaeasy.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AppointCreateResponse {
    private int appointmentId;
    private String  paymenturl;
}
