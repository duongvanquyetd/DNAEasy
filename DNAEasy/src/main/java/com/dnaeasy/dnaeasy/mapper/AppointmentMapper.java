package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.AppointmentCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.AppointmentResponse;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.AppointmnentTracking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
@Mapper(componentModel = "spring")
public interface AppointmentMapper {
    Appointment AppointmentCreateRequestToAppointment(AppointmentCreateRequest AppointmentCreateRequest);


    @Mapping(target = "serviceName" ,source = "service.serviceName")
    @Mapping(target = "paymentMethod",source = "payment.paymentMethod")
    @Mapping(target = "staffName",source = "staff.name")
    @Mapping(target = "customerName" ,source = "customer.name")
    @Mapping(target = "tracking",expression = "java(AppointmetTrackingToMap(appointment))")
    @Mapping(target = "paymentAmount" , source = "payment.paymentAmount")
    AppointmentResponse AppointmentCreateResponse(Appointment appointment);
    default Map<String, LocalDateTime> AppointmetTrackingToMap(Appointment appointment) {
        Map<String, LocalDateTime> appointmetTracking = new HashMap<>();
        for(AppointmnentTracking a : appointment.getAppointmnentTrackings()) {
            appointmetTracking.put(a.getStatusName(),a.getStatusDate());
        }
        return appointmetTracking;
    }
}