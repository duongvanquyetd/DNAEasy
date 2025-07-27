package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.*;
import com.dnaeasy.dnaeasy.dto.response.PaymentResponse;
import com.dnaeasy.dnaeasy.dto.response.RevenueChartResponse;
import com.dnaeasy.dnaeasy.dto.response.StaticReponse;
import com.dnaeasy.dnaeasy.dto.response.VnpayResponse;
import com.dnaeasy.dnaeasy.enity.Payment;
import com.dnaeasy.dnaeasy.enity.Person;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
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
    StaticReponse getStaticByDate(StaticRequest request);
    Double findAllByPaymentYesterday();
    List<RevenueChartResponse> getRevenueStats(RevenueStatsRequest request);
    // New method for admin payment listing
    Page<PaymentResponse> getPaymentList(PaymentListRequest request, Pageable pageable);
}
