package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.AppointmentCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.AppointmentResponse;
import com.dnaeasy.dnaeasy.dto.response.AppointmentTrackingResponse;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.AppointmnentTracking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Mapper(componentModel = "spring")
public interface AppointmentMapper {
    Appointment AppointmentCreateRequestToAppointment(AppointmentCreateRequest AppointmentCreateRequest);


    @Mapping(target = "serviceName" ,source = "service.serviceName")
    @Mapping(target = "paymentMethod",source = "payment.paymentMethod")
    @Mapping(target = "staffName",source = "staff.name")
    @Mapping(target = "customerName" ,source = "customer.name")
    @Mapping(target = "tracking",expression = "java(AppointmentTrackingToList(appointment))")
    @Mapping(target = "paymentAmount" , source = "payment.paymentAmount")
    @Mapping(target = "typeService" ,source = "service.typeService")
    @Mapping(target = "paymentStatus",source = "payment.paymentStatus")
    AppointmentResponse AppointmentCreateResponse(Appointment appointment);
    default List<AppointmentTrackingResponse> AppointmentTrackingToList(Appointment appointment) {
      List<AppointmentTrackingResponse> list = new ArrayList<>();
        for(AppointmnentTracking a : appointment.getAppointmnentTrackings()) {
            AppointmentTrackingResponse trackingResponse = new AppointmentTrackingResponse();
            trackingResponse.setStatusName(a.getStatusName());
            trackingResponse.setStatusDate(a.getStatusDate());
            trackingResponse.setImageUrl(a.getImageUrl());
            list.add(trackingResponse);
        }
        return list;
    }
}