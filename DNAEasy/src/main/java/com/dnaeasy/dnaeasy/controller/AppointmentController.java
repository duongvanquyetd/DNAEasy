package com.dnaeasy.dnaeasy.controller;


import com.dnaeasy.dnaeasy.dto.request.AppoinmetnAssignRequest;
import com.dnaeasy.dnaeasy.dto.request.AppointmentCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.RevenueStatsRequest;
import com.dnaeasy.dnaeasy.dto.request.StaticRequest;
import com.dnaeasy.dnaeasy.dto.request.StatusUpdateAppointment;

import com.dnaeasy.dnaeasy.dto.request.*;

import com.dnaeasy.dnaeasy.dto.response.*;
import com.dnaeasy.dnaeasy.dto.response.RevenueDataPoint;

import com.dnaeasy.dnaeasy.dto.response.AppointCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.AppointmentResponse;

import com.dnaeasy.dnaeasy.dto.response.StaffResponse;

import com.dnaeasy.dnaeasy.dto.response.SummaryTodayResponse;
import com.dnaeasy.dnaeasy.dto.response.SummaryYesterdayResponse;

import com.dnaeasy.dnaeasy.dto.response.AppointmentStatsResponse;

import com.dnaeasy.dnaeasy.service.impl.AppointmentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

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
    public ResponseEntity<Page<AppointmentResponse>> getAllFlowCurrentUser(@RequestParam("page") int page,
                                                                           @RequestParam("size") int size,
                                                                           @RequestParam("keysearch") String keysearch) {
        Pageable pagable = PageRequest.of(page-1, size, Sort.by("dateCollect").descending());
        return ResponseEntity.ok(appointmentService.getAllFlowCurentUser(keysearch,pagable));
    }
    @GetMapping("/getALl")
    public ResponseEntity<List<AppointmentResponse>> getAll() {
        return ResponseEntity.ok(appointmentService.getAll());
    }
    @GetMapping("/getAppointmentInprocess")
    public ResponseEntity<Page<AppointmentResponse>> getAppointmentInprocess( @RequestParam("page") int page,
                                                                              @RequestParam("size") int size,
                                                                              @RequestParam("keysearch") String keysearch

    ) {
        Pageable pagable = PageRequest.of(page-1, size, Sort.by("createdate").descending());

        return ResponseEntity.ok(appointmentService.getAppoinmentinprocess(keysearch.trim(),pagable));
    }
//    @GetMapping("/getForStaffLab")
//    public ResponseEntity<List<AppointmentResponse>> getForStaffLab() {
//        return ResponseEntity.ok(appointmentService.getAppoinmentFofStaff_Lab());
//    }
//
//    @GetMapping("/getforStaffReception")
//    public ResponseEntity<List<AppointmentResponse>> getForStaffReception() {
//        return  ResponseEntity.ok(appointmentService.getAppoinmentFofStaff_Reception());
//    }





    @PostMapping("/statistics")
    public ResponseEntity<StaticReponse> getByDate(@RequestBody StaticRequest request) {

        StaticReponse response = appointmentService.getStaticByDate(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/topservice")
    public ResponseEntity<List<TopServiceReponse>> getTopService() {
        List<TopServiceReponse> reponse = appointmentService.findTopService();
        return ResponseEntity.ok(reponse);
    }

    @GetMapping("/managershift")
    public ResponseEntity<Page<AppointmentAssingResponse>> getManager(@RequestParam("size") int size , @RequestParam("page") int page){
        Pageable pageable = PageRequest.of(page-1,size);

        return ResponseEntity.ok(appointmentService.getAppointmnetForMangerShiftStaff(pageable));
    }
    @PostMapping("/assignStaff")
    public ResponseEntity<AppointmentResponse>  assignStaffForApp(@RequestBody  AppoinmetnAssignRequest request)
    {
        return  ResponseEntity.ok(appointmentService.AssignStaffForApp(request));
    }

    @GetMapping("/staffs/{id}")
    public ResponseEntity<Page<StaffResponse>> getStaffs(@PathVariable("id") int id

    ,@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("keyword") String keyword) {

        Pageable pageable = PageRequest.of(page-1,size);
        return ResponseEntity.ok(appointmentService.getStaffForAppointment(id,keyword,pageable));
    }

    @GetMapping("/canrefund/{id}")
    public ResponseEntity<Boolean> getCanRefund(@PathVariable("id") int id) {
        return  ResponseEntity.ok(appointmentService.CanRefund(id));

    }

    @PostMapping("/reportappointment")
    public ResponseEntity<List<AppointmentReportResponse>> getAppointmentReport(@RequestBody AppointmnetReportRequest request) {
        return ResponseEntity.ok(appointmentService.getAppointmentReport(request));
    }
    @PostMapping("/revenue_chart")
    public ResponseEntity<List<RevenueDataPoint>> getRevenueChart(@RequestBody StaticRequest request) {
        List<RevenueDataPoint> chart = appointmentService.getSimplifiedRevenueData(
                request.getStartPeriod(),
                request.getEndPeriod()
        );
        return ResponseEntity.ok(chart);
    }
    
    @PostMapping("/chart/revenue")
    public ResponseEntity<List<RevenueDataPoint>> getSimpleRevenueChart(@RequestBody StaticRequest request) {
        List<RevenueDataPoint> chart = appointmentService.getSimplifiedRevenueData(
                request.getStartPeriod(),
                request.getEndPeriod()
        );
        return ResponseEntity.ok(chart);
    }

    @PostMapping("/revenue-stats")
    public ResponseEntity<List<RevenueChartResponse>> getRevenueStats(@RequestBody RevenueStatsRequest request) {
        return ResponseEntity.ok(appointmentService.getRevenueStats(
            request.getType(),
            request.getFrom(),
            request.getTo(),
            request.getYear()
        ));
    }
    
    @GetMapping("/stats")
    public ResponseEntity<AppointmentStatsResponse> getAppointmentStats() {
        return ResponseEntity.ok(appointmentService.getAppointmentStats());

    }
}
