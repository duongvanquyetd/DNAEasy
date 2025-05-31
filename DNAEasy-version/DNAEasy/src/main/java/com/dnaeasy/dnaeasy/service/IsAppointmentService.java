package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.AppointmentCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.StatusUpdateAppointment;
import com.dnaeasy.dnaeasy.dto.response.AppointmentCreateResponse;

public interface IsAppointmentService {

    String createAppointment(AppointmentCreateRequest request);
    AppointmentCreateResponse cancelAppointment(StatusUpdateAppointment request);
}
