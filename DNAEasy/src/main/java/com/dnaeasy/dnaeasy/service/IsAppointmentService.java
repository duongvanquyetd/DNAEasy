package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.AppoinmetnAssignRequest;
import com.dnaeasy.dnaeasy.dto.request.AppointmentCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.StatusUpdateAppointment;
import com.dnaeasy.dnaeasy.dto.response.AppointCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.AppointmentResponse;
import com.dnaeasy.dnaeasy.dto.response.StaffResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IsAppointmentService {

    AppointCreateResponse createAppointment(AppointmentCreateRequest request, HttpServletRequest httpServletReques);

    AppointmentResponse UpdateStatusAppoinment(StatusUpdateAppointment request, MultipartFile file);

    List<AppointmentResponse> getAllFlowCurentUser();
    List<AppointmentResponse> getAll();
    List<AppointmentResponse> getAppoinmentinprocess();
    List<AppointmentResponse> getAppoinmentFofStaff_Lab();
    List<AppointmentResponse> getAppoinmentFofStaff_Reception();
    int getCompletedAppointmentsToday();
    List<AppointmentResponse> getAppointmentYesterday();

    List<AppointmentResponse> getAppointmnetForMangerShiftStaff();
    StaffResponse AssignStaffForApp(AppoinmetnAssignRequest request);
    List<StaffResponse> getStaffForAppointment(int appointmentId);
    boolean CanRefund(int appointmentId);

}
