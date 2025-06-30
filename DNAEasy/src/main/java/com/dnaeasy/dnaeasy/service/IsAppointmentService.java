package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.*;

import com.dnaeasy.dnaeasy.dto.response.*;

import com.dnaeasy.dnaeasy.dto.response.AppointCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.AppointmentResponse;

import com.dnaeasy.dnaeasy.dto.response.StaffResponse;

import com.dnaeasy.dnaeasy.dto.response.SummaryTodayResponse;
import com.dnaeasy.dnaeasy.dto.response.SummaryYesterdayResponse;

import com.dnaeasy.dnaeasy.enity.Appointment;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface IsAppointmentService {

    AppointCreateResponse createAppointment(AppointmentCreateRequest request, HttpServletRequest httpServletReques);

    AppointmentResponse UpdateStatusAppoinment(StatusUpdateAppointment request, MultipartFile file);

    Page<AppointmentResponse> getAllFlowCurentUser(String keyserch,Pageable pageable);
    List<AppointmentResponse> getAll();
    Page<AppointmentResponse> getAppoinmentinprocess(String keyserch,Pageable pageable);
//    List<AppointmentResponse> getAppoinmentFofStaff_Lab();
//    List<AppointmentResponse> getAppoinmentFofStaff_Reception();

    int getCompletedAppointmentsToday();
    List<AppointmentResponse> getAppointmentYesterday();

    Page<AppointmentAssingResponse> getAppointmnetForMangerShiftStaff(Pageable pageable);
    AppointmentResponse AssignStaffForApp(AppoinmetnAssignRequest request);
    Page<StaffResponse> getStaffForAppointment(int appointmentId,String keyword,Pageable pageable);
    boolean CanRefund(int appointmentId);


 Map<String, SummaryTodayResponse> getTodaySummary();
    StaticReponse getStaticByDate(StaticRequest request);
    List<TopServiceReponse> findTopService(StaticRequest request);

    List<AppointmentReportResponse> getAppointmentReport(AppointmnetReportRequest request);



}
