package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.PaymentUpdateResquest;
import com.dnaeasy.dnaeasy.dto.response.PaymentResponse;
import com.dnaeasy.dnaeasy.dto.response.VnpayResponse;
import com.dnaeasy.dnaeasy.enity.Payment;
import com.dnaeasy.dnaeasy.enity.Person;
import jakarta.servlet.http.HttpServletRequest;

public interface IsPaymentService {
    String paymentUrlVnpay(int appointmentid, HttpServletRequest request);
    PaymentResponse UpdateStatusToView(PaymentUpdateResquest resquest);
    String PayToviewResult(int appointmentId, HttpServletRequest request);
    String PayAgaint(int appointmentId,HttpServletRequest request);
    void ConfirmPaidCash(int appointmentId);
    VnpayResponse UrlReturnFE(HttpServletRequest request);

}
