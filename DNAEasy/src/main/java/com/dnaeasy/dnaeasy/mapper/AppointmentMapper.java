package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.AppointmentCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.AppointmentResponse;
import com.dnaeasy.dnaeasy.dto.response.AppointmentTrackingResponse;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.AppointmnentTracking;
import com.dnaeasy.dnaeasy.enity.Payment;
import com.dnaeasy.dnaeasy.enums.PaymentMehtod;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Mapper(componentModel = "spring")
public interface AppointmentMapper {
    Appointment AppointmentCreateRequestToAppointment(AppointmentCreateRequest AppointmentCreateRequest);


    @Mapping(target = "serviceName" ,source = "service.serviceName")
    @Mapping(target = "paymentMethod",expression = "java(paymentMehtod(appointment))")
    @Mapping(target = "staffName",source = "staff.name")
    @Mapping(target = "customerName" ,source = "customer.name")
    @Mapping(target = "tracking",expression = "java(AppointmentTrackingToList(appointment))")
    @Mapping(target = "paymentAmount" , expression ="java(paymentAmount(appointment))")
    @Mapping(target = "typeService" ,source = "service.typeService")
    @Mapping(target = "paymentStatus",expression = "java(paymentStatus(appointment))")
    @Mapping(target = "serviceId" ,source  ="service.serviceId")
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
    default PaymentMehtod paymentMehtod(Appointment appointment) {

       for(Payment p : appointment.getPayment()) {
           if(!p.isExpense())
           {
               return  p.getPaymentMethod();
           }
       }
        return null;
    }
    default boolean paymentStatus(Appointment appointment) {
         for(Payment p : appointment.getPayment()) {
            if(!p.isExpense())
            {
                return  p.isPaymentStatus();
            }
        }
        return false;
    }
    default BigDecimal paymentAmount(Appointment appointment) {

        for(Payment p : appointment.getPayment()) {
            if(!p.isExpense())
            {
                return  p.getPaymentAmount();
            }
        }
        return null;

    }

 }