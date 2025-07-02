package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.AppoinmetnAssignRequest;
import com.dnaeasy.dnaeasy.dto.request.AppointmentCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.StaticRequest;
import com.dnaeasy.dnaeasy.dto.request.StatusUpdateAppointment;

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
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Person person = isUserResponsity.findByUsername(username);
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

//        LocalDateTime stardate = request.getDateCollect().minusHours(2);
//        LocalDateTime enddate = request.getDateCollect().plusHours(6);
//        List<Person> stafflist = isUserResponsity.findStaffByWorkHour(stardate, enddate, Work_hour(request.getDateCollect()));
//        System.out.println(stafflist.size());
//
//        if (stafflist == null || stafflist.size() == 0) {
//            throw new BadRequestException("Appointment full in this time " + request.getDateCollect());
//        }
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

            appointmentList = isAppointmentResponsitory.findByStaffLabAndCurrentAppointmnetIsIn(sampleid, keysearch, pageable);

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

            List<Appointment> app = isAppointmentResponsitory.findAllByCurentStatusAppointmentNotIn(list, keysearch);

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
                Work_hour work = Work_hour(appointment.getDateCollect());
                if (work.equals(p.getWork_hour())) {
// tranh truong hop thanh toan bang tien mat no chua thanh toan ma da huy thi no se hien len tren ko hop ly
                    if (appointment.getCurentStatusAppointment().equals("CANCLE")) {
                        if (appointment.getSampelist().size() > 0 && appointment.getSampelist().getFirst().getCureStatusSample() != null) {
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

//    @Override
//    public List<AppointmentResponse> getAppoinmentFofStaff_Lab() {
//
//
//        // minh se  lay thoi gian dat lich -> doi sang ca -> kiem tra roi hien nhung lich hen thuoc ve ca cua minh len
//        String usename = SecurityContextHolder.getContext().getAuthentication().getName();
//        Person p = isUserResponsity.findByUsername(usename);
////        System.out.println(p.getName());
//        List<String> list = new ArrayList<>();
//        list.add("CANCLE");
//        list.add("COMPLETE");
//        list.add("REFUNDED");
//        List<Appointment> appointmentList = isAppointmentResponsitory.findAllByCurentStatusAppointmentNotIn(list);
//        List<AppointmentResponse> appointmentResponseList = new ArrayList<>();
//        for (Appointment appointment : appointmentList) {
//
//            List<Sample> sampleList = appointment.getSampelist();
//            if (sampleList != null && sampleList.size() > 0 && sampleList.get(0).getCureStatusSample() != null) {
//                ProcessTesting curent = isProcessTesting.findOrderProcessByStatusNameAndSampleMethod(sampleList.get(0).getCureStatusSample(), appointment.getTypeCollect());
//                ProcessTesting pro = isProcessTesting.findByOrderProcessAndSampleMethod(curent.getOrderProcess() + 1, appointment.getTypeCollect());
//
//                if (pro.getPerson_confirm().equals(RoleName.STAFF_LAB)) {
//                    Work_hour work = Work_hour(appointment.getDateCollect());
//                    if (work.equals(p.getWork_hour())) {
//                        AppointmentResponse appointmentResponse = appointmentMapper.AppointmentCreateResponse(appointment);
//                        appointmentResponse.setListSample(sampleService.getbyAppoinment(appointment.getAppointmentId()));
//
//                        appointmentResponseList.add(appointmentResponse);
//                    }
//                }
//
//                //  appointmentResponseList.add(appointmentMapper.AppointmentCreateResponse(appointment));
//
//            }
//
//        }
//
//
//        return appointmentResponseList;
//    }
//
//    @Override
//    public List<AppointmentResponse> getAppoinmentFofStaff_Reception() {
//
//
//        String usename = SecurityContextHolder.getContext().getAuthentication().getName();
//        List<String> lists = new ArrayList<>();
//        lists.add("CANCLE");
//        lists.add("COMPLETE");
//        lists.add("WAITING FOR PAYMENT");
//        Person p = isUserResponsity.findByUsername(usename);
//        List<Payment> listpayPayments = isPaymentResponsitory.findAllByPaymentStatusIsFalseAndExpenseIsFalseAndAppointment_CurentStatusAppointmentIsIn(lists);
//        List<AppointmentResponse> appointmentResponseList = new ArrayList<>();
//
//        List<Appointment> list = new ArrayList<>();
//        for (Payment payment : listpayPayments) {
//
//            list.add(payment.getAppointment());
//            System.out.println(list.size());
//        }
//
//        for (Appointment appointment : list) {
//            System.out.println(appointment.getAppointmentId());
//            System.out.println(appointment.getDateCollect());
//            Work_hour work = Work_hour(appointment.getDateCollect());
//            System.out.println(work);
//
//
//            if (work.equals(p.getWork_hour())) {

    /// / tranh truong hop thanh toan bang tien mat no chua thanh toan ma da huy thi no se hien len tren ko hop ly
//                if (appointment.getCurentStatusAppointment().equals("CANCLE")) {
//                    if (appointment.getSampelist().size() > 0 && appointment.getSampelist().getFirst().getCureStatusSample() != null) {
//                        AppointmentResponse appointmentResponse = appointmentMapper.AppointmentCreateResponse(appointment);
//                        appointmentResponse.setListSample(sampleService.getbyAppoinment(appointment.getAppointmentId()));
//
//                        appointmentResponseList.add(appointmentResponse);
//                    }
//                } else {
//                    AppointmentResponse appointmentResponse = appointmentMapper.AppointmentCreateResponse(appointment);
//                    appointmentResponse.setListSample(sampleService.getbyAppoinment(appointment.getAppointmentId()));
//
//                    appointmentResponseList.add(appointmentResponse);
//                }
//
//
//            }
//
//
//        }
//        return appointmentResponseList;
//    }
//
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
    public Page<AppointmentResponse> getAppointmnetForMangerShiftStaff(Pageable pageable) {
        Page<Appointment> appointments = isAppointmentResponsitory.findForMangerAssign(pageable);


        return appointments.map(appointmentMapper::AppointmentCreateResponse);
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
        return list.map(userMapper::PersonToStaffResponse);
    }

    @Override
    public boolean CanRefund(int appointmentId) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Person p = isUserResponsity.findByUsername(username);
        Appointment appointment = isAppointmentResponsitory.findById(appointmentId).orElseThrow(() -> new BadRequestException("Appointment Not Found"));
        Work_hour time = Work_hour(appointment.getDateCollect());

        if (appointment.getSampelist() == null || appointment.getSampelist().size() == 0) {
            return false;
        }
        if (time == p.getWork_hour() && p.getRolename().equals(RoleName.STAFF_RECEPTION) && appointment.getSampelist().getFirst().getCureStatusSample() != null && appointment.getCurentStatusAppointment().equals("CANCLE")) {
            return true;
        }
        return false;
    }

    @Override
    public List<RevenueChartResponse> getRevenueByDay(String startDate, String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);

        List<RevenueChartResponse> chartData = new ArrayList<>();
        LocalDate current = start;
        // Duyệt qua từng ngày trong khoảng thời gian
        while (!current.isAfter(end)) {
            // Get revenue cho ngày hiện tại (chỉ lấy completed payments)
            BigDecimal dailyRevenue = isPaymentResponsitory.getRevenueByDate(current);
            if (dailyRevenue == null) dailyRevenue = BigDecimal.ZERO;
            
            // Get refund amount for this day 
            BigDecimal refund = BigDecimal.ZERO;
            // Kiểm tra trực tiếp xem có khoản thanh toán refund nào cho ngày này không
            List<Payment> directRefunds = isPaymentResponsitory.findRefundPaymentsForDate(current);
            if (!directRefunds.isEmpty()) {
                for (Payment p : directRefunds) {
                    refund = refund.add(p.getPaymentAmount());
                }
            } else {
                // Nếu không tìm thấy qua phương thức trực tiếp, thử phương thức khác
                LocalDateTime startOfDay = current.atStartOfDay();
                LocalDateTime endOfDay = current.plusDays(1).atStartOfDay();
                List<Payment> rangeRefunds = isPaymentResponsitory.findRefundPaymentsForDateRange(startOfDay, endOfDay);
                if (!rangeRefunds.isEmpty()) {
                    for (Payment p : rangeRefunds) {
                        refund = refund.add(p.getPaymentAmount());
                    }
                }
            }
            RevenueChartResponse chartItem = new RevenueChartResponse();
            chartItem.setDate(current);
            chartItem.setRevenue(dailyRevenue);
            chartItem.setName(current.toString());
            chartItem.setRefund(refund);
            chartData.add(chartItem);
            current = current.plusDays(1);
        }
        return chartData;
    }

    @Override
    public List<RevenueChartResponse> getRevenueStats(String type, LocalDate from, LocalDate to, Integer year) {
        List<RevenueChartResponse> result = new ArrayList<>();
        
        switch (type) {
            case "day":
                if (from == null || to == null) {
                    throw new BadRequestException("From and to dates are required for day type");
                }
                
                // Xử lý từng ngày trong khoảng thời gian
                LocalDate current = from;
                while (!current.isAfter(to)) {
                    // Lấy doanh thu ngày
                    BigDecimal revenue = isPaymentResponsitory.getRevenueByDate(current);
                    if (revenue == null) revenue = BigDecimal.ZERO;
                    
                    // Lấy hoàn tiền ngày
                    BigDecimal refund = calculateRefundForDate(current);
                    
                    // Tạo response
                    RevenueChartResponse item = new RevenueChartResponse();
                    item.setDate(current);
                    item.setRevenue(revenue);
                    item.setName(current.toString());
                    item.setRefund(refund);
                    result.add(item);
                    
                    current = current.plusDays(1);
                }
                break;
            case "month":
                if (year == null) {
                    year = LocalDate.now().getYear();
                }
                
                // Xử lý 12 tháng trong năm
                for (int month = 1; month <= 12; month++) {
                    String monthName = Month.of(month).getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
                    LocalDate firstDay = LocalDate.of(year, month, 1);
                    LocalDate lastDay = firstDay.withDayOfMonth(firstDay.lengthOfMonth());
                    
                    // Lấy doanh thu tháng
                    BigDecimal revenue = isPaymentResponsitory.getRevenueByPeriod(
                            firstDay.atStartOfDay(), 
                            lastDay.atTime(23, 59, 59)
                    );
                    if (revenue == null) revenue = BigDecimal.ZERO;
                    
                    // Lấy hoàn tiền tháng
                    BigDecimal refund = calculateRefundForDateRange(firstDay, lastDay);
                    
                    // Tạo response
                    RevenueChartResponse item = new RevenueChartResponse();
                    item.setDate(firstDay);
                    item.setRevenue(revenue);
                    item.setName(monthName);
                    item.setRefund(refund);
                    result.add(item);
                }
                break;
            case "year":
                // Lấy 5 năm gần nhất
                int currentYear = LocalDate.now().getYear();
                int startYear = currentYear - 4;
                
                for (int yr = startYear; yr <= currentYear; yr++) {
                    LocalDate firstDay = LocalDate.of(yr, 1, 1);
                    LocalDate lastDay = LocalDate.of(yr, 12, 31);
                    
                    // Lấy doanh thu năm
                    BigDecimal revenue = isPaymentResponsitory.getRevenueByPeriod(
                            firstDay.atStartOfDay(), 
                            lastDay.atTime(23, 59, 59)
                    );
                    if (revenue == null) revenue = BigDecimal.ZERO;
                    
                    // Lấy hoàn tiền năm
                    BigDecimal refund = calculateRefundForDateRange(firstDay, lastDay);
                    
                    // Tạo response
                    RevenueChartResponse item = new RevenueChartResponse();
                    item.setDate(firstDay);
                    item.setRevenue(revenue);
                    item.setName(String.valueOf(yr));
                    item.setRefund(refund);
                    result.add(item);
                }
                break;
                
            default:
                throw new BadRequestException("Invalid type. Must be 'day', 'month', or 'year'");
        }
        
        return result;
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

    @Override
    public StaticReponse getStaticByDate(StaticRequest request) {
        LocalDateTime start, end;

        DateTimeFormatter yearMonthFormatter = DateTimeFormatter.ofPattern("yyyy-MM");
        DateTimeFormatter yearFormatter = DateTimeFormatter.ofPattern("yyyy");

        if (request.getStartDate() != null && request.getEndDate() != null) {
            // ✅ Lọc theo khoảng ngày (giữ nguyên)
            start = request.getStartDate().atStartOfDay();
            end = request.getEndDate().atTime(23, 59, 59);

        } else if (request.getStartPeriod() != null && request.getEndPeriod() != null) {
            // 🆕 Lọc theo khoảng tháng hoặc năm
            if (request.getStartPeriod().length() == 7 && request.getEndPeriod().length() == 7) {
                // Khoảng theo tháng: "yyyy-MM"
                YearMonth ymStart = YearMonth.parse(request.getStartPeriod(), yearMonthFormatter);
                YearMonth ymEnd = YearMonth.parse(request.getEndPeriod(), yearMonthFormatter);
                start = ymStart.atDay(1).atStartOfDay();
                end = ymEnd.atEndOfMonth().atTime(23, 59, 59);

            } else if (request.getStartPeriod().length() == 4 && request.getEndPeriod().length() == 4) {
                // Khoảng theo năm: "yyyy"
                Year yStart = Year.parse(request.getStartPeriod(), yearFormatter);
                Year yEnd = Year.parse(request.getEndPeriod(), yearFormatter);
                start = yStart.atMonth(1).atDay(1).atStartOfDay();
                end = yEnd.atMonth(12).atEndOfMonth().atTime(23, 59, 59);
            } else {
                throw new IllegalArgumentException("Invalid startPeriod/endPeriod format (must be yyyy or yyyy-MM)");
            }
        } else {
            throw new IllegalArgumentException("Please provide valid date info");
        }

        BigDecimal revenue = isPaymentResponsitory.getTodayRevenueToday(start, end);
        if (revenue == null) revenue = BigDecimal.ZERO;

        BigDecimal expense = isPaymentResponsitory.getTotalExpense(start, end);
        if (expense == null) expense = BigDecimal.ZERO;

        BigDecimal remain = revenue.subtract(expense);
        StaticReponse response = new StaticReponse();
        response.setRevenue(revenue);
        response.setTotalExpense(expense);
        response.setRemain(remain);
        return new StaticReponse(revenue, expense, remain);
    }


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

}

