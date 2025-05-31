package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.enity.Payment;
import com.dnaeasy.dnaeasy.service.impl.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.*;

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
}
