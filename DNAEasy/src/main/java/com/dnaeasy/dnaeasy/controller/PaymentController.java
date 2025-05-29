package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.service.impl.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("api/payment")
public class PaymentController {
    @Autowired
    PaymentService paymentService;
    @PostMapping("/vn_pay")
    public ResponseEntity<String> vnpay() {

       return ResponseEntity.ok(paymentService.paymentUrl("DNA",1000000));

    }
    @PostMapping("/vn-pay-callback")
    public ResponseEntity<String>Callback() {


        return ResponseEntity.ok(paymentService.checkPayment());


    }
}
