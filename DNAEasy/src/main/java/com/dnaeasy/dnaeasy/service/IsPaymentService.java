package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.PaymentUpdateResquest;
import com.dnaeasy.dnaeasy.dto.response.PaymentResponse;
import com.dnaeasy.dnaeasy.enity.Payment;
import com.dnaeasy.dnaeasy.enity.Person;

public interface IsPaymentService {
    String paymentUrlVnpay(Payment payment);
    PaymentResponse UpdateStatus(PaymentUpdateResquest resquest);
    String PayToviewResult(int appointmentId);
    String PayAgaint(int appointmentId);
    void ConfirmPaidCash(int appointmentId);

}
