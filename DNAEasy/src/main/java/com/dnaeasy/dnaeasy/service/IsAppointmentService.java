package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.AppointmentCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.StatusUpdateAppointment;
import com.dnaeasy.dnaeasy.dto.response.AppointCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.AppointmentResponse;

import java.util.List;

public interface IsAppointmentService {

    AppointCreateResponse createAppointment(AppointmentCreateRequest request);

    AppointmentResponse UpdateStatusAppoinment(StatusUpdateAppointment request);

    List<AppointmentResponse> getAllFlowCurentUser();
    List<AppointmentResponse> getAll();
    List<AppointmentResponse> getAppoinmentinprocess();
}
