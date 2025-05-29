package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.StatusUpdateAppointment;
import com.dnaeasy.dnaeasy.dto.response.AppointmentCreateResponse;
import com.dnaeasy.dnaeasy.service.impl.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/appointment")
public class AppointmentController {
    @Autowired
    AppointmentService appointmentService;
//    @PostMapping("/create")
//    public ResponseEntity<AppointmentCreateResponse> createAppointment(@RequestBody AppointmentCreateRequest appointment) {
//
//        return ResponseEntity.ok(appointmentService.createAppointment(appointment));
//    }
    @GetMapping("/updateStatus")
    public ResponseEntity<AppointmentCreateResponse> Canncle(@RequestBody StatusUpdateAppointment request) {
        return ResponseEntity.ok(appointmentService.cancelAppointment(request));
    }
}
