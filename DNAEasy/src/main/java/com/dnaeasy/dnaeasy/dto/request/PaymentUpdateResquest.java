package com.dnaeasy.dnaeasy.dto.request;

import com.dnaeasy.dnaeasy.enums.PaymentMehtod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentUpdateResquest {

    private int appointmentId;
    private PaymentMehtod paymentMehtod;
}
