package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.*;

import com.dnaeasy.dnaeasy.dto.response.AppointCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.AppointmentResponse;
import com.dnaeasy.dnaeasy.dto.response.SampleResponse;
import com.dnaeasy.dnaeasy.dto.response.StaffResponse;

import com.dnaeasy.dnaeasy.dto.response.*;

import com.dnaeasy.dnaeasy.enity.*;
import com.dnaeasy.dnaeasy.enums.PaymentMehtod;
import com.dnaeasy.dnaeasy.enums.RoleName;
import com.dnaeasy.dnaeasy.enums.SampleMethod;
import com.dnaeasy.dnaeasy.enums.Work_hour;
import com.dnaeasy.dnaeasy.exception.BadRequestException;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.mapper.AppointmentMapper;
import com.dnaeasy.dnaeasy.mapper.SampleMapper;
import com.dnaeasy.dnaeasy.mapper.UserMapper;
import com.dnaeasy.dnaeasy.responsity.*;
import com.dnaeasy.dnaeasy.service.IsAppointmentService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.util.Pair;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

import java.sql.Timestamp;


import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;
import com.dnaeasy.dnaeasy.dto.response.RevenueDataPoint;
import java.time.YearMonth;
import java.time.Year;

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
    PaymentService paymentService;
    @Autowired
    SampleService sampleService;
    @Autowired
    IsResultResponsitory isResultResponsitory;
    @Autowired
    CloudinaryUtil cloudinaryUtil;
    @Autowired
    IsSystemConfigRepo isSystemConfigRepo;
    @Autowired
    UserMapper userMapper;
    @Autowired
    IsPaymentResponsitory isPaymentResponsitory;
    @Autowired
    NotificationService notificationService;
    @Autowired
    private IsPersonRepository isPersonRepository;


    @Override
    public AppointCreateResponse createAppointment(AppointmentCreateRequest request, HttpServletRequest httpServletRequest) {


        String firstStatus = "WAITING FOR PAYMENT";

        if (request.getTypeCollect().equals(SampleMethod.Self_collection)) {
            request.setDateCollect(LocalDateTime.now());
        }

        List<AppointmnentTracking> trackingList = new ArrayList<>();
        AppointmnentTracking appointmnentTracking = new AppointmnentTracking();
        appointmnentTracking.setStatusName(firstStatus);
        appointmnentTracking.setStatusDate(LocalDateTime.now());
        trackingList.add(appointmnentTracking);


        com.dnaeasy.dnaeasy.enity.Service service = (com.dnaeasy.dnaeasy.enity.Service) isServiceResponsitory.findById(Long.valueOf(request.getServiceid())).orElseThrow(() ->
                new ResourceNotFound("Do not have " + request.getServiceid()));
        Payment payment = new Payment();
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setContenPayment("Pay haft price for " + service.getServiceName());
        payment.setPaymentStatus(false);
        BigDecimal amout = service.getServicePrice().divide(BigDecimal.valueOf(2));// them bang configSystem
        payment.setPaymentAmount(amout);
        payment.setPaymentDate(LocalDateTime.now());
        Person person = null;
        if(request.getPersonId() >0)
        {
            person = isUserResponsity.findByPersonId(request.getPersonId());
        }
        else {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
             person = isUserResponsity.findByUsername(username);
        }

        // thêm bảng system config và thay mấy hashcode này thành giá trị trong bảngt
        SystemConfig houropen = isSystemConfigRepo.findByName("houropen");
        SystemConfig hourclose = isSystemConfigRepo.findByName("hourclose");
        int hour_open = Integer.valueOf(houropen.getValue());
        int hour_close = Integer.valueOf(hourclose.getValue());

        if (!request.getTypeCollect().equals(SampleMethod.Self_collection)) {
            if (request.getDateCollect().isBefore(LocalDateTime.now().plusHours(4)) || request.getDateCollect().getHour() < hour_open || request.getDateCollect().getHour() >= hour_close) {

                throw new BadRequestException("Date collect must be after now 4 hours and must be interval " + hour_open + " to " + hour_close);
            }
        }

        LocalDateTime stardate = request.getDateCollect().minusHours(2);
        LocalDateTime enddate = request.getDateCollect().plusHours(6);
        Page<Person> stafflist = isUserResponsity.findStaffByWorkHour(stardate, enddate, Work_hour(request.getDateCollect()), PageRequest.of(0,10));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd'/'MM'/'yyyy  HH:mm");

        if (stafflist.getContent().isEmpty()) {
            throw new BadRequestException("Appointment full in this time " +request.getDateCollect().format(formatter) );
        }
//
//        Person staff = stafflist.get(0);

        Appointment appointment = appointmentMapper.AppointmentCreateRequestToAppointment(request);
        appointment.setService(service);
        appointment.setCustomer(person);
        appointment.setCurentStatusAppointment(firstStatus);

        appointment.getPayment().add(payment);
        appointment.setAppointmnentTrackings(trackingList);

        for (AppointmnentTracking tracking : appointment.getAppointmnentTrackings()) {
            tracking.setAppointment(appointment);
        }
        payment.setAppointment(appointment);

        isAppointmentResponsitory.save(appointment);
        AppointCreateResponse appointCreateResponse = new AppointCreateResponse();
        appointCreateResponse.setAppointmentId(appointment.getAppointmentId());
        if (payment.getPaymentMethod().equals(PaymentMehtod.VNPay)) {

            appointCreateResponse.setPaymenturl(paymentService.paymentUrlVnpay(appointment.getAppointmentId(), httpServletRequest));
        }

        return appointCreateResponse;
    }

    @Override
    public AppointmentResponse UpdateStatusAppoinment(StatusUpdateAppointment request, MultipartFile file) {

        Appointment appointment = isAppointmentResponsitory.findById(request.getAppointmentId()).orElseThrow(() -> new ResourceNotFound("Do not have " + request.getAppointmentId()));
        appointment.setCurentStatusAppointment(request.getStatus());
        appointment.setNote(request.getNote());
        AppointmnentTracking tracking = new AppointmnentTracking();
        tracking.setStatusName(request.getStatus());
        tracking.setStatusDate(LocalDateTime.now());

        if (file != null) {

            try {

                tracking.setImageUrl(cloudinaryUtil.uploadImage(file));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        tracking.setAppointment(appointment);
        appointment.getAppointmnentTrackings().add(tracking);
        isAppointmentResponsitory.save(appointment);
        return appointmentMapper.AppointmentCreateResponse(appointment);


    }

    @Override
    public Page<AppointmentResponse> getAllFlowCurentUser(String keysearch, Pageable pageable) {


        String usename = SecurityContextHolder.getContext().getAuthentication().getName();
        Person p = isUserResponsity.findByUsername(usename);
//        System.out.println(p.getName());
        Page<Appointment> appointmentList = null;
        List<String> list = new ArrayList<>();
        list.add("CANCLE");
        list.add("COMPLETE");
        list.add("REFUNDED");
        if (p.getRolename().equals(RoleName.STAFF_TEST)) {
            appointmentList = isAppointmentResponsitory.findAllByStaffAndCurentStatusAppointmentIsIn(p, list, keysearch, pageable);
        } else if (p.getRolename().equals(RoleName.STAFF_LAB)) {

            List<Integer> sampleid = new ArrayList<>();
            List<Result> results = isResultResponsitory.findAllByStaff(p);
            for (Result result : results) {

                Set<Sample> sampleList = result.getSampelist();
                for (Sample sample : sampleList) {
                    sampleid.add(sample.getSampleid());
                }
            }

            appointmentList = isAppointmentResponsitory.findByStaffLabAndCurrentAppointmnetIsIn(sampleid, !keysearch.trim().isEmpty() ? keysearch : null, pageable);

//            if (!result.isEmpty()) {
//                for (Result r : result) {
//                    appointmentList.getContent().add(r.getSampelist().iterator().next().getAppointment());
//                }
//            }


        } else if (p.getRolename().equals(RoleName.STAFF_RECEPTION)) {
            List<String> lis = new ArrayList<>();
            lis.add("REFUNDED");
            lis.add("COMPLETE");

            appointmentList = isAppointmentResponsitory.findALLByPayment_StaffReceptionAndCurentStatusAppointmentIsIn(p, lis, keysearch, pageable);


        } else {
            appointmentList = isAppointmentResponsitory.findAllByCustomerAndCurentStatusAppointmentIsIn(p, list, keysearch, pageable);
        }

        Page<AppointmentResponse> appointmentResponses = appointmentList.map(appointmentMapper::AppointmentCreateResponse);
        for (AppointmentResponse appointmentResponse : appointmentResponses.getContent()) {


            appointmentResponse.setListSample(sampleService.getbyAppoinment(appointmentResponse.getAppointmentId()));
        }

        return appointmentResponses;
    }

    @Override
    public List<AppointmentResponse> getAll() {
        List<Appointment> appointmentList = isAppointmentResponsitory.findAll();
        List<AppointmentResponse> appointmentResponseList = new ArrayList<>();
        appointmentList.forEach(appointment -> {
            AppointmentResponse appointmentResponse = appointmentMapper.AppointmentCreateResponse(appointment);
            appointmentResponse.setListSample(sampleService.getbyAppoinment(appointment.getAppointmentId()));

            appointmentResponseList.add(appointmentResponse);
            //  appointmentResponseList.add(appointmentMapper.AppointmentCreateResponse(appointment));
        });
        return appointmentResponseList;
    }

    @Override
    public Page<AppointmentResponse> getAppoinmentinprocess(String keysearch, Pageable pageable) {
        String usename = SecurityContextHolder.getContext().getAuthentication().getName();
        Person p = isUserResponsity.findByUsername(usename);
        // System.out.println(p.getName());
        Page<Appointment> appointmentList = null;
        List<String> list = new ArrayList<>();
        list.add("CANCLE");
        list.add("COMPLETE");
        list.add("REFUNDED");
        List<Appointment> listpaging = new ArrayList<>();
        // staff lab cung nen hien nhung cai ma thuoc ve ca cua minh va nhung cai minh can confirm
        if (p.getRolename().equals(RoleName.STAFF_TEST)) {
            list.add("WAITING FOR PAYMENT");
            List<Appointment> appointments = isAppointmentResponsitory.findAllByStaffAndCurentStatusAppointmentNotIn(p, list, keysearch);

            for (Appointment appointment : appointments) {
                ProcessTesting processTesting = new ProcessTesting();
                if (appointment.getSampelist().get(0).getCureStatusSample() == null) {
                    processTesting = isProcessTesting.findByOrderProcessAndSampleMethod(1, appointment.getTypeCollect());

                } else {
                    ProcessTesting curent = isProcessTesting.findOrderProcessByStatusNameAndSampleMethod(appointment.getSampelist().get(0).getCureStatusSample(), appointment.getTypeCollect());
                    processTesting = isProcessTesting.findByOrderProcessAndSampleMethod(curent.getOrderProcess() + 1, appointment.getTypeCollect());
                }
                if (p.getRolename().equals(processTesting.getPerson_confirm())) {
                    listpaging.add(appointment);
                }
            }


        } else if (p.getRolename().equals(RoleName.STAFF_LAB)) {

            List<Appointment> app = isAppointmentResponsitory.findAllByCurentStatusAppointmentNotIn(list, !keysearch.isEmpty() ? keysearch : null);

            for (Appointment appointment : app) {

                List<Sample> sampleList = appointment.getSampelist();
                if (sampleList != null && sampleList.size() > 0 && sampleList.get(0).getCureStatusSample() != null) {
                    ProcessTesting curent = isProcessTesting.findOrderProcessByStatusNameAndSampleMethod(sampleList.get(0).getCureStatusSample(), appointment.getTypeCollect());
                    ProcessTesting pro = isProcessTesting.findByOrderProcessAndSampleMethod(curent.getOrderProcess() + 1, appointment.getTypeCollect());

                    if (pro.getPerson_confirm().equals(RoleName.STAFF_LAB)) {
                        Work_hour work = Work_hour(appointment.getDateCollect());
                        if (work.equals(p.getWork_hour())) {
                            listpaging.add(appointment);
                        }
                    }
                }

            }
        } else if (p.getRolename().equals(RoleName.STAFF_RECEPTION)) {
            list = new ArrayList<>();
            list.add("CANCLE");
            list.add("COMPLETE");
            list.add("WAITING FOR PAYMENT");

            List<Appointment> appt = isAppointmentResponsitory.findAllByPaymentStatusIsFalseAndExpenseIsFalseAndAppointment_CurentStatusAppointmentIsIn(keysearch, list);


            for (Appointment appointment : appt) {

                System.out.println(appointment.getDateCollect()+"daaa");
                Work_hour work = Work_hour(appointment.getDateCollect());
                if (work.equals(p.getWork_hour())) {
                    if (appointment.getCurentStatusAppointment().equals("CANCLE")) {
                        if (appointment.getSampelist().size() > 0 ) {
                            listpaging.add(appointment);
                        }
                    } else {
                        listpaging.add(appointment);
                    }
                }
            }

        } else {
            appointmentList = isAppointmentResponsitory.findAllByCustomerAndCurentStatusAppointmentNotIn(p, list, keysearch, pageable);
        }

        if (!p.getRolename().equals(RoleName.CUSTOMER)) {
            int pagesize = pageable.getPageSize();
            int startpage = pageable.getPageNumber() * pagesize;
            int endpage = Math.min(startpage + pagesize, listpaging.size());
            List<Appointment> paging = listpaging.subList(startpage, endpage);

            appointmentList = new PageImpl<>(paging, pageable, listpaging.size());
        }


        if (appointmentList != null && appointmentList.getContent().size() > 0) {
            Page<AppointmentResponse> appointmentResponses = appointmentList.map(appointmentMapper::AppointmentCreateResponse);
            for (AppointmentResponse appointmentResponse : appointmentResponses.getContent()) {


                appointmentResponse.setListSample(sampleService.getbyAppoinment(appointmentResponse.getAppointmentId()));
            }

            return appointmentResponses;
        }
        return null;
    }
    public Work_hour Work_hour(LocalDateTime dateCollect) {
        int hour = dateCollect.getHour();

        int minute = dateCollect.getMinute();
        double hour_minute = hour + (minute / 100.0);

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


    @Override
    public int getCompletedAppointmentsToday() {
        LocalDateTime startDay = LocalDateTime.now().toLocalDate().atStartOfDay();
        LocalDateTime endDay = startDay.plusDays(1);
        return isAppointmentResponsitory.countCompletedAppointmentsToday(startDay, endDay);
    }

    @Override
    public List<AppointmentResponse> getAppointmentYesterday() {
        LocalDateTime startDay = LocalDateTime.now().minusDays(1).toLocalDate().atStartOfDay();
        LocalDateTime endDay = LocalDateTime.now().toLocalDate().atStartOfDay().minusNanos(1);

        List<Appointment> listAppointmentYesterday = isAppointmentResponsitory.findAllByCurentStatusAppointmentAndDateCollectIsBetween("COMPLTED", startDay, endDay);

        return listAppointmentYesterday.stream()
                .map(appointmentMapper::AppointmentCreateResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<AppointmentAssingResponse> getAppointmnetForMangerShiftStaff(Pageable pageable) {
        Page<Appointment> appointments = isAppointmentResponsitory.findForMangerAssign(pageable);
        Page<AppointmentAssingResponse> assingResponses = appointments.map(appointmentMapper::ApointmenetToAppoinAssingResponse);
        for (Appointment appointment : appointments.getContent()) {

            for (AppointmentAssingResponse assingResponse : assingResponses.getContent()) {
                if (assingResponse.getAppointmentId() == appointment.getAppointmentId() && appointment.getStaff() != null) {
                    assingResponse.setStaffResponse(userMapper.PersonToStaffResponse(appointment.getStaff()));
                }
            }
        }
        return assingResponses;
    }

    @Override
    public AppointmentResponse AssignStaffForApp(AppoinmetnAssignRequest request) {
        Appointment a = isAppointmentResponsitory.findById(request.getAppoinmetnId()).orElseThrow(() ->
        {
            throw new BadRequestException("Appointment with id " + request.getAppoinmetnId() + " not found");
        });
        Person staff = isUserResponsity.findByPersonId(request.getPersonId());
        a.setStaff(staff);
        if (staff != null) // chuc nang huy assign staff
        {
//notification
            String code = "";
            for (Sample s : a.getSampelist()) {
                code += s.getSamplecode() + "-";
            }

            notificationService.createNotification(staff, "You have appointment at " + a.getDateCollect() + "  in " + a.getLocation() + "(" + a.getTypeCollect() + "). " + " Let prepare " + a.getService().getSample_count() + " .kit test with sample code is " + code.substring(0, code.length() - 1));

//notification
            staff.getAppointmentList().add(a);
            isUserResponsity.save(staff);
        } else {
            isAppointmentResponsitory.save(a);
        }


        return appointmentMapper.AppointmentCreateResponse(a);
    }

    @Override
    public Page<StaffResponse> getStaffForAppointment(int appointmentId, String keyword, Pageable pageable) {

        Appointment a = isAppointmentResponsitory.findById(appointmentId).orElseThrow(() -> new BadRequestException("Appointment Not Found"));
        LocalDate day = LocalDate.from(a.getDateCollect());
        LocalDateTime startDay = day.atStartOfDay();
        LocalDateTime endDay = startDay.plusDays(1);
        Page<Person> list = null;
        if (keyword == null || keyword.trim().isEmpty()) {
            list = isUserResponsity.findStaffByWorkHour(startDay, endDay, Work_hour(a.getDateCollect()), pageable);

        } else {
            list = isUserResponsity.findStaffByWorkHourWithKeyWord(startDay, endDay, Work_hour(a.getDateCollect()), pageable, keyword);
        }
        Page<StaffResponse> responses = list.map(userMapper::PersonToStaffResponse);
        for (int i = 0; i < responses.getContent().size(); i++) {

            responses.getContent().get(i).setAssignCount(isAppointmentResponsitory.countByStaff(list.getContent().get(i)));


        }
        return responses;
    }

    @Override
    public boolean CanRefund(int appointmentId) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Person p = isUserResponsity.findByUsername(username);
        Appointment appointment = isAppointmentResponsitory.findById(appointmentId).orElseThrow(() -> new BadRequestException("Appointment Not Found"));
        Work_hour time = Work_hour(appointment.getDateCollect());

//        if (appointment.getSampelist() == null || appointment.getSampelist().size() == 0) {
//            return false;
//        }
        if (time == p.getWork_hour() && p.getRolename().equals(RoleName.STAFF_RECEPTION) && appointment.getCurentStatusAppointment().equals("CANCLE")) {
            return true;
        }
        return false;
    }

    private BigDecimal calculateRefundForDate(LocalDate date) {
        BigDecimal total = BigDecimal.ZERO;
        // Tìm refund bằng truy vấn trực tiếp
        List<Payment> refunds = isPaymentResponsitory.findRefundPaymentsForDate(date);
        if (refunds.isEmpty()) {
            // Thử cách khác nếu không tìm thấy
            LocalDateTime start = date.atStartOfDay();
            LocalDateTime end = date.plusDays(1).atStartOfDay();
            refunds = isPaymentResponsitory.findRefundPaymentsForDateRange(start, end);
        }
        // Tính tổng
        for (Payment p : refunds) {
            total = total.add(p.getPaymentAmount());
        }
        return total;
    }
    private BigDecimal calculateRefundForDateRange(LocalDate startDate, LocalDate endDate) {
        BigDecimal total = BigDecimal.ZERO;
        LocalDate current = startDate;
        // Duyệt qua từng ngày và tính tổng
        while (!current.isAfter(endDate)) {
            total = total.add(calculateRefundForDate(current));
            current = current.plusDays(1);
        }
        
        return total;
    }

//
    @Override
    public List<TopServiceReponse> findTopService() {

        return isAppointmentResponsitory.findTop10Service();
    }

    @Override
    public AppointmentStatsResponse getAppointmentStats() {
        int total = isAppointmentResponsitory.countAllAppointments();
        int completed = isAppointmentResponsitory.countCompletedAppointments();
        int inProgress = isAppointmentResponsitory.countInProgressAppointments();
        int cancelled = isAppointmentResponsitory.countCancelledAppointments();
        int refunded = isAppointmentResponsitory.countRefundedAppointments();
        
        return new AppointmentStatsResponse(total, completed, inProgress, cancelled, refunded);
    }

    @Override
    public Page<AppointmentResponse> getAppointmentByDate(AppointmnetReportRequest request, Pageable pageabl) {

         Page<Appointment> appointments = isAppointmentResponsitory.getAppointmentsByCreatedateAndCurentStatusAppointmentIsIn(request.getFromdate().atStartOfDay(),request.getTodate().plusDays(1).atStartOfDay(),request.getCurrentStatus(),pageabl);



        return appointments.map(appointmentMapper::AppointmentCreateResponse);
    }

    @Override
    public List<AppointmentResponse> recentAppointments(Pageable pageable) {

        List<Appointment> list = isAppointmentResponsitory.findTop10(pageable);
        return list.stream().map(appointmentMapper::AppointmentCreateResponse).collect(Collectors.toList());
    }


    @Override
    public List<RevenueDataPoint> getSimplifiedRevenueData(String startDate, String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);

        List<RevenueDataPoint> chartData = new ArrayList<>();
        LocalDate current = start;
        // Iterate through each day in the date range
        while (!current.isAfter(end)) {
            // Get revenue for the current day (only completed payments)
            BigDecimal dailyRevenue = isPaymentResponsitory.getRevenueByDate(current);
            if (dailyRevenue == null) dailyRevenue = BigDecimal.ZERO;

            // Create data point with the date in yyyy-MM-dd format and revenue
            RevenueDataPoint dataPoint = new RevenueDataPoint();
            dataPoint.setDate(current.format(formatter));
            dataPoint.setRevenue(dailyRevenue.intValue());
            chartData.add(dataPoint);
            current = current.plusDays(1);
        }
        return chartData;
    }

    @Override
    public List<?> getAppointmentReport(AppointmnetReportRequest request) {
        List<AppointmentReportResponse> responses = new ArrayList<>();

            if ( request.getType() != null && request.getType().equalsIgnoreCase("year")) {
                int year = request.getTodate().getYear();
                for (int i = 1; i <= 12; i++) {
                    LocalDateTime star = LocalDate.of(year, i, 1).atStartOfDay();
                    LocalDateTime end = LocalDate.of(year, i , 1).with(TemporalAdjusters.lastDayOfMonth()).atTime(23, 59, 59);
                    AppointmentReportResponse response = new AppointmentReportResponse();
                    response.setAppointmentDate(LocalDate.from(star));
                    response.setComplete(isAppointmentResponsitory.countByDateCollectAndCurentStatusAppointmentIsLike(star, end, "COMPLETE"));
                    response.setCancle(isAppointmentResponsitory.countByDateCollectAndCurentStatusAppointmentIsLike(star, end, "CANCLE"));
                    response.setRefunded(isAppointmentResponsitory.countByDateCollectAndCurentStatusAppointmentIsLike(star, end, "REFUNDED"));
                    List<String> list = new ArrayList<>();
                    list.add("COMPLETE");
                    list.add("CANCLE");
                    list.add("REFUNDED");
                    response.setInprocess(isAppointmentResponsitory.countAppointmentInprocess(star, end, list));
                    responses.add(response);
                }

            return  responses;
        }
        LocalDateTime star = request.getFromdate().atStartOfDay();
        LocalDateTime end = request.getTodate().atTime(23, 59, 59);
        LocalDateTime current = star.plusDays(1);
        while(star.isBefore(end)) {
            AppointmentReportResponse response = new AppointmentReportResponse();
            response.setAppointmentDate(LocalDate.from(star));
            response.setComplete(isAppointmentResponsitory.countByDateCollectAndCurentStatusAppointmentIsLike(star, current, "COMPLETE"));
            response.setCancle(isAppointmentResponsitory.countByDateCollectAndCurentStatusAppointmentIsLike(star, current, "CANCLE"));
            response.setRefunded(isAppointmentResponsitory.countByDateCollectAndCurentStatusAppointmentIsLike(star, current, "REFUNDED"));
            List<String> list = new ArrayList<>();
            list.add("COMPLETE");
            list.add("CANCLE");
            list.add("REFUNDED");
            response.setInprocess(isAppointmentResponsitory.countAppointmentInprocess(star, current, list));
            responses.add(response);
            star = star.plusDays(1);
            current = star.plusDays(1);

            }
        return responses;

    }

}

