package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.*;
import com.dnaeasy.dnaeasy.dto.response.PaymentResponse;
import com.dnaeasy.dnaeasy.dto.response.RevenueChartResponse;
import com.dnaeasy.dnaeasy.dto.response.StaticReponse;
import com.dnaeasy.dnaeasy.dto.response.VnpayResponse;
import com.dnaeasy.dnaeasy.enity.*;
import com.dnaeasy.dnaeasy.service.impl.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.math.BigDecimal;
import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("api/payment")
public class PaymentController {
    @Autowired
    PaymentService paymentService;

    @PostMapping("/vn_pay/{id}")
    public ResponseEntity<String> vnpay(@PathVariable("id") int id, HttpServletRequest request) {
        return ResponseEntity.ok(paymentService.paymentUrlVnpay(id, request));

    }

    @GetMapping("/vnpay-callback")
    public RedirectView Callback(HttpServletRequest request) {
        VnpayResponse response = paymentService.UrlReturnFE(request);
        return new RedirectView("https://library.id.vn/payment?"
                + "success=" + response.isSuccess()
                + "&appointmentId=" + response.getAppointmentId()
                + "&paymentfor=" + response.getPaymentfor());
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<Boolean> Status(@PathVariable("id") int appointmentId) {
        return ResponseEntity.ok(paymentService.StatusPayment(appointmentId));
    }

    @PostMapping("/updateStatus")
    public ResponseEntity<String> updateStatus(@RequestBody PaymentUpdateResquest resquest) {
        paymentService.UpdateStatusToView(resquest);
        return ResponseEntity.ok("Payment successful");

    }

    @GetMapping("/paytoview/{id}")
    public ResponseEntity<String> paytoview(@PathVariable("id") int appointment, HttpServletRequest request) {
        return ResponseEntity.ok(paymentService.PayToviewResult(appointment, request));
    }

    @GetMapping("/payagaint/{id}")
    public ResponseEntity<String> payagint(@PathVariable("id") int appointment, HttpServletRequest request) {
        return ResponseEntity.ok(paymentService.PayAgaint(appointment, request));
    }

    @GetMapping("/confirmpaid/{id}")
    public ResponseEntity<String> ConfirmPaid(@PathVariable("id") int appointment) {

        paymentService.ConfirmPaidCash(appointment);
        return ResponseEntity.ok("Payment successful");
    }


    @GetMapping("/revenuetoday")
    public ResponseEntity<BigDecimal> getRevenueToday() {
        return ResponseEntity.ok(paymentService.totalRevenueToday());
    }

    @GetMapping("/renue-yesterday")
    public ResponseEntity<Double> getRenueYesterday(){
        return ResponseEntity.ok(paymentService.findAllByPaymentYesterday());

    }
    
    @PostMapping("/create")
    public ResponseEntity<PaymentResponse> createPaymentRefund(@RequestPart("payment") PaymentRefundRequest paymentRefundRequest,@RequestPart("file") MultipartFile file) {
        return ResponseEntity.ok(paymentService.CreatePaymentRefund(paymentRefundRequest,file));
    }
    
    @PostMapping("/list")
    public ResponseEntity<Page<PaymentResponse>> getPaymentList(@RequestBody PaymentListRequest request, @RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page-1, size);

        return ResponseEntity.ok(paymentService.getPaymentList(request,pageable));
    }
    @PostMapping("/revenue-stats")
    public ResponseEntity<List<RevenueChartResponse>> getRevenueStats(@RequestBody RevenueStatsRequest request) {
        return ResponseEntity.ok(paymentService.getRevenueStats(request));
    }
    @PostMapping("/statistics")
    public ResponseEntity<StaticReponse> getByDate(@RequestBody StaticRequest request) {
        StaticReponse response = paymentService.getStaticByDate(request);
        return ResponseEntity.ok(response);
    }
}
