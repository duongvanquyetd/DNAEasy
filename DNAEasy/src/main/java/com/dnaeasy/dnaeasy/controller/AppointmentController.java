package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.AppointmentCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.StatusUpdateAppointment;
import com.dnaeasy.dnaeasy.dto.response.AppointCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.AppointmentResponse;
import com.dnaeasy.dnaeasy.service.impl.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<AppointmentResponse> UpdateStatus(@RequestBody StatusUpdateAppointment request) {
        return ResponseEntity.ok(appointmentService.UpdateStatusAppoinment(request));
    }
    @PostMapping("/create")
    public ResponseEntity<AppointCreateResponse> createAppointment(@RequestBody AppointmentCreateRequest appointment) {

        return ResponseEntity.ok(appointmentService.createAppointment(appointment));
    }
    @GetMapping("/getAllFlowCurrentUser")
    public ResponseEntity<List<AppointmentResponse>> getAllFlowCurrentUser() {
        return ResponseEntity.ok(appointmentService.getAllFlowCurentUser());
    }
    @GetMapping("/getALl")
    public ResponseEntity<List<AppointmentResponse>> getAll() {
        return ResponseEntity.ok(appointmentService.getAll());
    }
    @GetMapping("/getAppointmentInprocess")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentInprocess() {
        return ResponseEntity.ok(appointmentService.getAppoinmentinprocess());
    }
    //
}
