package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.AppointmentCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.StatusUpdateAppointment;
import com.dnaeasy.dnaeasy.dto.response.AppointCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.AppointmentResponse;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.AppointmnentTracking;
import com.dnaeasy.dnaeasy.enity.Payment;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.enums.RoleName;
import com.dnaeasy.dnaeasy.enums.Work_hour;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.mapper.AppointmentMapper;
import com.dnaeasy.dnaeasy.mapper.SampleMapper;
import com.dnaeasy.dnaeasy.responsity.*;
import com.dnaeasy.dnaeasy.service.IsAppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    public AppointCreateResponse createAppointment(AppointmentCreateRequest request) {


        String firstStatus = "WAITING FOR PAYMENT";


        List<AppointmnentTracking> trackingList = new ArrayList<>();
        AppointmnentTracking appointmnentTracking = new AppointmnentTracking();
        appointmnentTracking.setStatusName(firstStatus);
        appointmnentTracking.setStatusDate(LocalDateTime.now());
        trackingList.add(appointmnentTracking);


        com.dnaeasy.dnaeasy.enity.Service service = (com.dnaeasy.dnaeasy.enity.Service) isServiceResponsitory.findById(request.getServiceid()).orElseThrow(() ->
                new ResourceNotFound("Do not have " + request.getServiceid()));
        Payment payment = new Payment();
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setContenPayment("Pay haft price for " + service.getServiceName());
        payment.setPaymentStatus(false);
        BigDecimal amout = service.getServicePrice().divide(BigDecimal.valueOf(2));
        payment.setPaymentAmount(amout);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Person person = isUserResponsity.findByUsername(username);
        // thêm bảng system config và thay mấy hashcode này thành giá trị trong bảng
        if (request.getDateCollect().isBefore(LocalDateTime.now().plusHours(4)) && request.getDateCollect().getHour() >= 7 && request.getDateCollect().getHour() <= 17) {
            throw new IllegalStateException("Date collect must be after now 4 hours and must be interval 7h to 17h");
        }


        LocalDateTime stardate = request.getDateCollect().minusHours(2);
        LocalDateTime enddate = request.getDateCollect().plusHours(6);

        System.out.println(Work_hour(request.getDateCollect()));
        List<Person> stafflist = isUserResponsity.findStaffByWorkHour(stardate, enddate, Work_hour(request.getDateCollect()));
        if (stafflist == null || stafflist.size() == 0) {
            throw new ResourceNotFound("Appointment full in this time " + request.getDateCollect());
        }
        Person staff = stafflist.get(0);
        System.out.println("stafflist" + stafflist);
        Appointment appointment = appointmentMapper.AppointmentCreateRequestToAppointment(request);
        System.out.println(request);
        System.out.println(appointment.getLocation());
        appointment.setService(service);
        appointment.setCustomer(person);
        appointment.setCurentStatusAppointment(firstStatus);
        appointment.setStaff(staff);
        appointment.setPayment(payment);
        appointment.setAppointmnentTrackings(trackingList);

        for (AppointmnentTracking tracking : appointment.getAppointmnentTrackings()) {
            tracking.setAppointment(appointment);
        }
        payment.setAppointment(appointment);

        isPaymentResponsitory.save(payment);

// Payment p  = new Payment();
// p.setPaymentAmount(new BigDecimal(10000000));
// p.setContenPayment("thanh toan DNa");
        AppointCreateResponse appointCreateResponse = new AppointCreateResponse();
        appointCreateResponse.setAppointmentId(appointment.getAppointmentId());
        appointCreateResponse.setPaymenturl(paymentService.paymentUrl(appointment.getPayment()));
        return appointCreateResponse;
    }

    @Override
    public AppointmentResponse UpdateStatusAppoinment(StatusUpdateAppointment request) {

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

    @Override
    public List<AppointmentResponse> getAllFlowCurentUser() {


        String usename = SecurityContextHolder.getContext().getAuthentication().getName();
        Person p = isUserResponsity.findByUsername(usename);
        System.out.println(p.getName());
        List<Appointment> appointmentList = new ArrayList<>();

        if (p.getRolename().equals(RoleName.STAFF_LAB) || p.getRolename().equals(RoleName.STAFF_TEST)) {
            appointmentList = isAppointmentResponsitory.findAllByStaff(p);
        } else {
            appointmentList = isAppointmentResponsitory.findAllByCustomer(p);
        }

        List<AppointmentResponse> appointmentResponseList = new ArrayList<>();
        appointmentList.forEach(appointment -> {
            appointmentResponseList.add(appointmentMapper.AppointmentCreateResponse(appointment));
        });
        return appointmentResponseList;
    }

    @Override
    public List<AppointmentResponse> getAll() {
        List<Appointment> appointmentList = isAppointmentResponsitory.findAll();
        List<AppointmentResponse> appointmentResponseList = new ArrayList<>();
        appointmentList.forEach(appointment -> {
            appointmentResponseList.add(appointmentMapper.AppointmentCreateResponse(appointment));
        });
        return appointmentResponseList;
    }

    @Override
    public List<AppointmentResponse> getAppoinmentinprocess() {
        String usename = SecurityContextHolder.getContext().getAuthentication().getName();
        Person p = isUserResponsity.findByUsername(usename);
        System.out.println(p.getName());
        List<Appointment> appointmentList = new ArrayList<>();
        List<String> list = new ArrayList<>();
        list.add("CANCLE");
        list.add("COMPLETE");
        if (p.getRolename().equals(RoleName.STAFF_LAB) || p.getRolename().equals(RoleName.STAFF_TEST)) {
            appointmentList = isAppointmentResponsitory.findAllByStaffAndCurentStatusAppointmentNotIn(p, list);
        } else {
            appointmentList = isAppointmentResponsitory.findAllByCustomerAndCurentStatusAppointmentNotIn(p, list);
        }

        List<AppointmentResponse> appointmentResponseList = new ArrayList<>();
        appointmentList.forEach(appointment -> {
            appointmentResponseList.add(appointmentMapper.AppointmentCreateResponse(appointment));
        });
        return appointmentResponseList;
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
