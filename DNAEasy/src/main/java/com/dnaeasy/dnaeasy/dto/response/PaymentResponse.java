package com.dnaeasy.dnaeasy.dto.response;

import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.enums.PaymentMehtod;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponse {
    private int paymentId;
    private PaymentMehtod paymentMethod;
    private boolean paymentStatus;
    private String contenPayment;
    private BigDecimal paymentAmount;
    private String staffConfirmName;
    private String paycode;
    private BigDecimal totalAmount;
    private LocalDateTime paymentDate;

}
