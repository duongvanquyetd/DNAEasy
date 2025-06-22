package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.AppointmentCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.StaticRequest;
import com.dnaeasy.dnaeasy.dto.request.StatusUpdateAppointment;
import com.dnaeasy.dnaeasy.dto.response.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface IsAppointmentService {

    AppointCreateResponse createAppointment(AppointmentCreateRequest request, HttpServletRequest httpServletReques);

    AppointmentResponse UpdateStatusAppoinment(StatusUpdateAppointment request, MultipartFile file);

    List<AppointmentResponse> getAllFlowCurentUser();
    List<AppointmentResponse> getAll();
    List<AppointmentResponse> getAppoinmentinprocess();
    List<AppointmentResponse> getAppoinmentFofStaff_Lab();
    List<AppointmentResponse> getAppoinmentFofStaff_Reception();
//    int getCompletedAppointmentsToday();
    Map<String, SummaryTodayResponse> getTodaySummary();
//    List<AppointmentResponse> getAppointmentYesterday();
    Map<String, SummaryYesterdayResponse> getYesterdaySummary();
    StaticReponse getStaticByDate(StaticRequest request);
    List<TopServiceReponse> findTopService(StaticRequest request);
}
