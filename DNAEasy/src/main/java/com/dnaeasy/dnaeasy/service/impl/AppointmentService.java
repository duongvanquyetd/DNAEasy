package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.AppointmentCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.StatusUpdateAppointment;
import com.dnaeasy.dnaeasy.dto.response.AppointmentCreateResponse;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.AppointmnentTracking;
import com.dnaeasy.dnaeasy.enums.Work_hour;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.mapper.AppointmentMapper;
import com.dnaeasy.dnaeasy.responsity.*;
import com.dnaeasy.dnaeasy.service.IsAppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AppointmentService implements IsAppointmentService {
    @Autowired
    IsAppointmentResponsitory isAppointmentResponsitory;
    @Autowired
    IsServiceResponsitory isServiceResponsitory;
    @Autowired
    IsUserResponsity isUserResponsity;
    @Autowired
    AppointmentMapper appointmentMapper;
    @Autowired
    IsProcessTesting isProcessTesting;
    @Autowired
    IsPaymentResponsitory isPaymentResponsitory;
    @Autowired
    PaymentService paymentService;
//    @Override
//    public AppointmentCreateResponse createAppointment(AppointmentCreateRequest request) {
//
//
//        String firstStatus = isProcessTesting.getFirstStatusNameBySampleMethod(request.getTypeCollect());
//
//
//        List<AppointmnentTracking> trackingList = new ArrayList<>();
//        AppointmnentTracking appointmnentTracking = new AppointmnentTracking();
//        appointmnentTracking.setStatusName(firstStatus);
//        appointmnentTracking.setStatusDate(LocalDateTime.now());
//        trackingList.add(appointmnentTracking);
//
//
//        com.dnaeasy.dnaeasy.enity.Service service = (com.dnaeasy.dnaeasy.enity.Service) isServiceResponsitory.findById(request.getServiceid()).orElseThrow(() ->
//                new ResourceNotFound("Do not have " + request.getServiceid()));
//
//
//
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        Person person = isUserResponsity.findByUsername(username);
//        // thêm bảng system config và thay mấy hashcode này thành giá trị trong bảng
//        if (request.getDateCollect().isBefore(LocalDateTime.now().plusHours(4)) && request.getDateCollect().getHour() >= 7 && request.getDateCollect().getHour() <= 17) {
//            throw new IllegalStateException("Date collect must be after now 4 hours and must be interval 7h to 17h");
//        }
//
//
//        LocalDateTime stardate = request.getDateCollect().minusHours(2);
//        LocalDateTime enddate = request.getDateCollect().plusHours(6);
//
//        System.out.println(Work_hour(request.getDateCollect()));
//        List<Person> stafflist = isUserResponsity.findStaffByWorkHour(stardate, enddate, Work_hour(request.getDateCollect()));
//        if (stafflist == null || stafflist.size() == 0) {
//            throw new ResourceNotFound("No staff found");
//        }
//        Person staff = stafflist.get(0);
//        System.out.println("stafflist"+stafflist);
//        Appointment appointment = appointmentMapper.AppointmentCreateRequestToAppointment(request);
//        System.out.println(request);
//        System.out.println(appointment.getLocation());
//        appointment.setService(service);
//        appointment.setCustomer(person);
//        appointment.setCurentStatusAppointment(firstStatus);
//        appointment.setStaff(staff);
//       // appointment.setPayment(payment);
//        appointment.setAppointmnentTrackings(trackingList);
//
//        for (AppointmnentTracking tracking : appointment.getAppointmnentTrackings()) {
//            tracking.setAppointment(appointment);
//        }
//
//       isAppointmentResponsitory.save(appointment);
//
//
//        return appointmentMapper.AppointmentCreateResponse(appointment);
//    }

    @Override
    public String createAppointment(AppointmentCreateRequest request) {
        return "";
    }

    @Override
    public AppointmentCreateResponse cancelAppointment(StatusUpdateAppointment request) {

        Appointment appointment = isAppointmentResponsitory.findById(request.getAppointmentId()).orElseThrow(() -> new ResourceNotFound("Do not have " + request.getAppointmentId()));
        appointment.setCurentStatusAppointment(request.getStautus());
        appointment.setNote(request.getNote());
        AppointmnentTracking tracking = new AppointmnentTracking();
        tracking.setStatusName(request.getStautus());
        tracking.setStatusDate(LocalDateTime.now());
        tracking.setAppointment(appointment);
        appointment.getAppointmnentTrackings().add(tracking);
        isAppointmentResponsitory.save(appointment);
        return appointmentMapper.AppointmentCreateResponse(appointment);


    }

    public Work_hour Work_hour(LocalDateTime dateCollect) {
        int hour = dateCollect.getHour();
        int minute = dateCollect.getMinute();
        int hour_minute = hour + (minute / 10);
        if (hour_minute >= 7 && hour_minute <= 9.3) {
            return Work_hour.ca_1;
        } else if (hour_minute > 9.3 && hour_minute <= 12) {
            return Work_hour.ca_2;
        } else if (hour_minute > 12 && hour_minute <= 14.3) {
            return Work_hour.ca_3;
        } else if (hour_minute > 14.3 && hour_minute <= 17) {
            return Work_hour.ca_4;
        }
        return null;
    }
}
