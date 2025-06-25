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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

import java.sql.Timestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
        System.out.println(hour_open + " " + hour_close);

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
    public List<AppointmentResponse> getAllFlowCurentUser() {


        String usename = SecurityContextHolder.getContext().getAuthentication().getName();
        Person p = isUserResponsity.findByUsername(usename);
//        System.out.println(p.getName());
        List<Appointment> appointmentList = new ArrayList<>();
        List<String> list = new ArrayList<>();
        list.add("CANCLE");
        list.add("COMPLETE");
        list.add("REFUNDED");
        if (p.getRolename().equals(RoleName.STAFF_TEST)) {
            appointmentList = isAppointmentResponsitory.findAllByStaffAndCurentStatusAppointmentIsIn(p, list);
        } else if (p.getRolename().equals(RoleName.STAFF_LAB)) {


            List<Result> result = isResultResponsitory.findAllByStaff(p);


            List<Sample> sampleList = new ArrayList<>();
            if (!result.isEmpty()) {
                for (Result r : result) {
                    appointmentList.add(r.getSampelist().iterator().next().getAppointment());
                }
            }


        } else if (p.getRolename().equals(RoleName.STAFF_RECEPTION)) {
            List<String> lis = new ArrayList<>();
            lis.add("REFUNDED");
            lis.add("COMPLETE");

            List<Appointment> list1 = isAppointmentResponsitory.findALLByPayment_StaffReceptionAndCurentStatusAppointmentIsIn(p, lis);
            appointmentList.addAll(list1);


        } else {
            appointmentList = isAppointmentResponsitory.findAllByCustomerAndCurentStatusAppointmentIsIn(p, list);
        }

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
    public List<AppointmentResponse> getAppoinmentinprocess() {
        String usename = SecurityContextHolder.getContext().getAuthentication().getName();
        Person p = isUserResponsity.findByUsername(usename);
        // System.out.println(p.getName());
        List<Appointment> appointmentList = new ArrayList<>();
        List<String> list = new ArrayList<>();
        list.add("CANCLE");
        list.add("COMPLETE");
        list.add("REFUNDED");


        // staff lab cung nen hien nhung cai ma thuoc ve ca cua minh va nhung cai minh can confirm
        if (p.getRolename().equals(RoleName.STAFF_TEST)) {
            list.add("WAITING FOR PAYMENT");
            List<Appointment> appointments = isAppointmentResponsitory.findAllByStaffAndCurentStatusAppointmentNotIn(p, list);

            for (Appointment appointment : appointments) {
                ProcessTesting processTesting = new ProcessTesting();
                if (appointment.getSampelist().get(0).getCureStatusSample() == null) {
                    processTesting = isProcessTesting.findByOrderProcessAndSampleMethod(1, appointment.getTypeCollect());

                } else {
                    ProcessTesting curent = isProcessTesting.findOrderProcessByStatusNameAndSampleMethod(appointment.getSampelist().get(0).getCureStatusSample(), appointment.getTypeCollect());
                    processTesting = isProcessTesting.findByOrderProcessAndSampleMethod(curent.getOrderProcess() + 1, appointment.getTypeCollect());
                }
                if (p.getRolename().equals(processTesting.getPerson_confirm())) {
                    appointmentList.add(appointment);
                }
            }

        } else {
            appointmentList = isAppointmentResponsitory.findAllByCustomerAndCurentStatusAppointmentNotIn(p, list);
        }

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
    public List<AppointmentResponse> getAppoinmentFofStaff_Lab() {


        // minh se  lay thoi gian dat lich -> doi sang ca -> kiem tra roi hien nhung lich hen thuoc ve ca cua minh len
        String usename = SecurityContextHolder.getContext().getAuthentication().getName();
        Person p = isUserResponsity.findByUsername(usename);
//        System.out.println(p.getName());
        List<String> list = new ArrayList<>();
        list.add("CANCLE");
        list.add("COMPLETE");
        list.add("REFUNDED");
        List<Appointment> appointmentList = isAppointmentResponsitory.findAllByCurentStatusAppointmentNotIn(list);
        List<AppointmentResponse> appointmentResponseList = new ArrayList<>();
        for (Appointment appointment : appointmentList) {

            List<Sample> sampleList = appointment.getSampelist();
            if (sampleList != null && sampleList.size() > 0 && sampleList.get(0).getCureStatusSample() != null) {
                ProcessTesting curent = isProcessTesting.findOrderProcessByStatusNameAndSampleMethod(sampleList.get(0).getCureStatusSample(), appointment.getTypeCollect());
                ProcessTesting pro = isProcessTesting.findByOrderProcessAndSampleMethod(curent.getOrderProcess() + 1, appointment.getTypeCollect());

                if (pro.getPerson_confirm().equals(RoleName.STAFF_LAB)) {
                    Work_hour work = Work_hour(appointment.getDateCollect());
                    if (work.equals(p.getWork_hour())) {
                        AppointmentResponse appointmentResponse = appointmentMapper.AppointmentCreateResponse(appointment);
                        appointmentResponse.setListSample(sampleService.getbyAppoinment(appointment.getAppointmentId()));

                        appointmentResponseList.add(appointmentResponse);
                    }
                }

                //  appointmentResponseList.add(appointmentMapper.AppointmentCreateResponse(appointment));

            }

        }


        return appointmentResponseList;
    }

    @Override
    public List<AppointmentResponse> getAppoinmentFofStaff_Reception() {


        String usename = SecurityContextHolder.getContext().getAuthentication().getName();
        List<String> lists = new ArrayList<>();
        lists.add("CANCLE");
        lists.add("COMPLETE");
        lists.add("WAITING FOR PAYMENT");
        Person p = isUserResponsity.findByUsername(usename);
        List<Payment> listpayPayments = isPaymentResponsitory.findAllByPaymentStatusIsFalseAndExpenseIsFalseAndAppointment_CurentStatusAppointmentIsIn(lists);
        List<AppointmentResponse> appointmentResponseList = new ArrayList<>();

        List<Appointment> list = new ArrayList<>();
        for (Payment payment : listpayPayments) {

            list.add(payment.getAppointment());
            System.out.println(list.size());
        }

        for (Appointment appointment : list) {
            System.out.println(appointment.getAppointmentId());
            System.out.println(appointment.getDateCollect());
            Work_hour work = Work_hour(appointment.getDateCollect());
            System.out.println(work);


            if (work.equals(p.getWork_hour())) {
// tranh truong hop thanh toan bang tien mat no chua thanh toan ma da huy thi no se hien len tren ko hop ly
                if (appointment.getCurentStatusAppointment().equals("CANCLE")) {
                    if (appointment.getSampelist().size() > 0 && appointment.getSampelist().getFirst().getCureStatusSample() != null) {
                        AppointmentResponse appointmentResponse = appointmentMapper.AppointmentCreateResponse(appointment);
                        appointmentResponse.setListSample(sampleService.getbyAppoinment(appointment.getAppointmentId()));

                        appointmentResponseList.add(appointmentResponse);
                    }
                } else {
                    AppointmentResponse appointmentResponse = appointmentMapper.AppointmentCreateResponse(appointment);
                    appointmentResponse.setListSample(sampleService.getbyAppoinment(appointment.getAppointmentId()));

                    appointmentResponseList.add(appointmentResponse);
                }


            }


        }
        return appointmentResponseList;
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
            for(Sample s : a.getSampelist())
            {
                code+=s.getSamplecode()+"-";
            }

            notificationService.createNotification(staff, "You have appointment at " + a.getDateCollect() + "  in " + a.getLocation() + "(" + a.getTypeCollect() + "). "+" Let prepare "+a.getService().getSample_count()+" .kit test with sample code is "+code.substring(0, code.length()-1));

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


//    @Override
//    public int getCompletedAppointmentsToday() {
//        LocalDateTime startDay = LocalDateTime.now().toLocalDate().atStartOfDay();
//        LocalDateTime endDay = startDay.plusDays(1);
//        return isAppointmentResponsitory.countCompletedAppointmentsToday(startDay, endDay);
//    }

    @Override
    public Map<String, SummaryTodayResponse> getTodaySummary() {
        LocalDateTime start = LocalDateTime.now().toLocalDate().atStartOfDay();
        LocalDateTime end = start.plusDays(1);

        int totalAppointment = isAppointmentResponsitory.countCompletedAppointmentsToday(start, end);

        BigDecimal revenue = isPaymentResponsitory.getTodayRevenueToday(start, end);
        Map<String, SummaryTodayResponse> summary = new HashMap<>();
        SummaryTodayResponse today = new SummaryTodayResponse(revenue, totalAppointment);

        summary.put("hôm nay", today);
        return summary;
    }


    @Override
    public StaticReponse getStaticByDate(StaticRequest request) {
        LocalDateTime start;
        LocalDateTime end;

        if (request.getDate() != null) {
            start = request.getDate().atStartOfDay();
            end = request.getDate().atTime(23, 59, 59);
        } else if (request.getMonth() != null && request.getYear() != null) {
            LocalDate first = LocalDate.of(request.getYear(), request.getMonth(), 1);
            LocalDate last = first.withDayOfMonth(first.lengthOfMonth());
            start = first.atStartOfDay();
            end = last.atTime(23, 59, 59);
        } else if (request.getYear() != null) {
            LocalDate firstDay = LocalDate.of(request.getYear(), 1, 1);
            LocalDate lastDay = LocalDate.of(request.getYear(), 12, 31);
            start = firstDay.atStartOfDay();
            end = lastDay.atTime(23, 59, 59);
        } else {
            throw new IllegalArgumentException("You have to chose date or month or year!!!");
        }


        int totalBills = isAppointmentResponsitory.countCompletedAppointmentsToday(start, end);
        BigDecimal revenue = isPaymentResponsitory.getTodayRevenueToday(start, end);
        if (revenue == null) revenue = BigDecimal.ZERO;
        return new StaticReponse(totalBills, revenue);
    }


    @Override
    public List<TopServiceReponse> findTopService(StaticRequest request) {
        LocalDateTime start;
        LocalDateTime end;

        if (request.getMonth() != null && request.getYear() != null) {
            LocalDate firstDay = LocalDate.of(request.getYear(), request.getMonth(), 1);
            LocalDate lastDay = firstDay.withDayOfMonth(firstDay.lengthOfMonth());
            start = firstDay.atStartOfDay();
            end = lastDay.atTime(23, 59, 59);
        } else if (request.getYear() != null) {
            LocalDate firstDay = LocalDate.of(request.getYear(), 1, 1);
            LocalDate lastDay = LocalDate.of(request.getYear(), 12, 31);
            start = firstDay.atStartOfDay();
            end = lastDay.atTime(23, 59, 59);
        } else {
            // Nếu không truyền gì thì mặc định là lấy hết
            start = LocalDate.of(2000, 1, 1).atStartOfDay();
            end = LocalDate.now().atTime(23, 59, 59);
        }

        List<TopServiceReponse> rawData = isAppointmentResponsitory.findTop10Service(
                Timestamp.valueOf(start), Timestamp.valueOf(end)
        );
        return rawData;
    }
}

