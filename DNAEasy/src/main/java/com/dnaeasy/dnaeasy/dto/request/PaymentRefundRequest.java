package com.dnaeasy.dnaeasy.dto.request;


import com.dnaeasy.dnaeasy.enums.PaymentMehtod;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class PaymentRefundRequest {
    private int appointmentId;
    private String paycode;
    private PaymentMehtod paymentMethod;
    private String contenPayment;
    private BigDecimal paymentAmount;
}
