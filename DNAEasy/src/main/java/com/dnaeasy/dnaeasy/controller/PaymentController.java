package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.enity.Payment;
import com.dnaeasy.dnaeasy.service.impl.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;
@CrossOrigin("*")
@RestController
@RequestMapping("api/payment")
public class PaymentController {
    @Autowired
    PaymentService paymentService;

    @PostMapping("/vn_pay")
    public ResponseEntity<String> vnpay() {
        Payment payment = new Payment();
        payment.setPaymentAmount(new BigDecimal(1000000));
        payment.setContenPayment("Thanh Toan mot nua  dich-vuFatherChild DNA Test Civil");

        return ResponseEntity.ok(paymentService.paymentUrl(payment));

    }

    @PostMapping("/vn-pay-callback")
    public ResponseEntity<String> Callback() {
        if (paymentService.checkPayment()) {
            return ResponseEntity.ok("Payment successful");
        }

        return ResponseEntity.ok("Payment failed");


    }
    @GetMapping("/status/{id}")
    public ResponseEntity<Boolean> Status(@PathVariable("id") int appointmentId) {
        return  ResponseEntity.ok(paymentService.StatusPayment(appointmentId));
    }
    @PostMapping("/updateStatus/{id}")
    public ResponseEntity<String> updateStatus(@PathVariable("id") int appointmentId) {
        paymentService.UpdateStatus(appointmentId);
        return ResponseEntity.ok("Payment successful");

    }
    @GetMapping("/paytoview/{id}")
    public ResponseEntity<String> paytoview(@PathVariable("id") int appointment) {
       return ResponseEntity.ok(paymentService.PayToviewResult(appointment)) ;
    }
}
