package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.PaymentListRequest;
import com.dnaeasy.dnaeasy.dto.request.PaymentRefundRequest;
import com.dnaeasy.dnaeasy.dto.request.PaymentUpdateResquest;
import com.dnaeasy.dnaeasy.dto.response.PaymentListResponse;
import com.dnaeasy.dnaeasy.dto.response.PaymentResponse;
import com.dnaeasy.dnaeasy.dto.response.VnpayResponse;
import com.dnaeasy.dnaeasy.enity.Payment;
import com.dnaeasy.dnaeasy.enity.Person;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

public interface IsPaymentService {
    String paymentUrlVnpay(int appointmentid, HttpServletRequest request);
    PaymentResponse UpdateStatusToView(PaymentUpdateResquest resquest);
    String PayToviewResult(int appointmentId, HttpServletRequest request);
    String PayAgaint(int appointmentId,HttpServletRequest request);
    void ConfirmPaidCash(int appointmentId);
    VnpayResponse UrlReturnFE(HttpServletRequest request);

    BigDecimal totalRevenueToday();
    PaymentResponse CreatePaymentRefund(PaymentRefundRequest request, MultipartFile file    );

    Double findAllByPaymentYesterday();
    
    // New method for admin payment listing
    PaymentListResponse getPaymentList(PaymentListRequest request);
}
