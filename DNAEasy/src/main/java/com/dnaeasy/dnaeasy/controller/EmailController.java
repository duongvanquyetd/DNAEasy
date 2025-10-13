package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.util.EmailSender;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/email")
public class EmailController {
    @Autowired
    EmailSender emailSender;

    @GetMapping("/send")
    public ResponseEntity<String> SendMail() {
        try {
            emailSender.SendMail("d.duongvanquyettn@gmail.com");
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }


}
