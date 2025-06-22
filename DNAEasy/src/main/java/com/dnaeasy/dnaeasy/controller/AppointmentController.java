package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.AppoinmetnAssignRequest;
import com.dnaeasy.dnaeasy.dto.request.AppointmentCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.StatusUpdateAppointment;
import com.dnaeasy.dnaeasy.dto.response.AppointCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.AppointmentResponse;
import com.dnaeasy.dnaeasy.dto.response.StaffResponse;
import com.dnaeasy.dnaeasy.service.impl.AppointmentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("api/appointment")
public class AppointmentController {
    @Autowired
    AppointmentService appointmentService;

    @PostMapping("/updateStatus")
    public ResponseEntity<AppointmentResponse> UpdateStatus(@RequestPart("appointmentUpdate") StatusUpdateAppointment request,@RequestPart(value = "file",required = false) MultipartFile file) {
        return ResponseEntity.ok(appointmentService.UpdateStatusAppoinment(request,file));
    }
    @PostMapping("/create")
    public ResponseEntity<AppointCreateResponse> createAppointment(@Valid @RequestBody AppointmentCreateRequest appointment, HttpServletRequest request) {

        return ResponseEntity.ok(appointmentService.createAppointment(appointment,request));
    }
    @GetMapping("/getAllCompleteFlowCurrentUser")
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
    @GetMapping("/getForStaffLab")
    public ResponseEntity<List<AppointmentResponse>> getForStaffLab() {
        return ResponseEntity.ok(appointmentService.getAppoinmentFofStaff_Lab());
    }

    @GetMapping("/getforStaffReception")
    public ResponseEntity<List<AppointmentResponse>> getForStaffReception() {
        return  ResponseEntity.ok(appointmentService.getAppoinmentFofStaff_Reception());
    }

    @GetMapping("/countToday")
    public ResponseEntity<Integer> countAppointmentsToday(){
        return ResponseEntity.ok(appointmentService.getCompletedAppointmentsToday());
    }

    @GetMapping("/countYesterday")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentYesterday(){
        return ResponseEntity.ok(appointmentService.getAppointmentYesterday());
    }
    @GetMapping("/managershift")
    public ResponseEntity<List<AppointmentResponse>> getManager(){
        return ResponseEntity.ok(appointmentService.getAppointmnetForMangerShiftStaff());
    }
    @PostMapping("/assignStaff")
    public ResponseEntity<StaffResponse>  assignStaffForApp(@RequestBody  AppoinmetnAssignRequest request)
    {
        return  ResponseEntity.ok(appointmentService.AssignStaffForApp(request));
    }

    @GetMapping("/staffs/{id}")
    public ResponseEntity<List<StaffResponse>> getStaffs(@PathVariable("id") int id) {
        return ResponseEntity.ok(appointmentService.getStaffForAppointment(id));
    }

    @GetMapping("/canrefund/{id}")
    public ResponseEntity<Boolean> getCanRefund(@PathVariable("id") int id) {
        return  ResponseEntity.ok(appointmentService.CanRefund(id));
    }
}
