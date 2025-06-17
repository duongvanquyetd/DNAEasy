package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.AppointmentCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.StatusUpdateAppointment;
import com.dnaeasy.dnaeasy.dto.response.AppointCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.AppointmentResponse;
import com.dnaeasy.dnaeasy.dto.response.SampleResponse;
import com.dnaeasy.dnaeasy.enity.*;
import com.dnaeasy.dnaeasy.enums.PaymentMehtod;
import com.dnaeasy.dnaeasy.enums.RoleName;
import com.dnaeasy.dnaeasy.enums.SampleMethod;
import com.dnaeasy.dnaeasy.enums.Work_hour;
import com.dnaeasy.dnaeasy.exception.BadRequestException;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.mapper.AppointmentMapper;
import com.dnaeasy.dnaeasy.mapper.SampleMapper;
import com.dnaeasy.dnaeasy.responsity.*;
import com.dnaeasy.dnaeasy.service.IsAppointmentService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    PaymentService paymentService;
    @Autowired
    SampleService sampleService;
    @Autowired
    IsResultResponsitory isResultResponsitory;
    @Autowired
    CloudinaryUtil cloudinaryUtil;
    @Autowired
    IsSystemConfigRepo isSystemConfigRepo;

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

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Person person = isUserResponsity.findByUsername(username);
        // thêm bảng system config và thay mấy hashcode này thành giá trị trong bảngt
        SystemConfig houropen = isSystemConfigRepo.findByName("houropen");
        SystemConfig hourclose = isSystemConfigRepo.findByName("hourclose");
        int hour_open = Integer.valueOf(houropen.getValue());
        int hour_close = Integer.valueOf(hourclose.getValue());


        if (!request.getTypeCollect().equals(SampleMethod.Self_collection)) {
            if (request.getDateCollect().isBefore(LocalDateTime.now().plusHours(4)) || request.getDateCollect().getHour() < hour_open || request.getDateCollect().getHour() > hour_close) {

                throw new BadRequestException("Date collect must be after now 4 hours and must be interval "+hour_open+" to "+hour_close);
            }
        }

        LocalDateTime stardate = request.getDateCollect().minusHours(2);
        LocalDateTime enddate = request.getDateCollect().plusHours(6);
        List<Person> stafflist = isUserResponsity.findStaffByWorkHour(stardate, enddate, Work_hour(request.getDateCollect()));
        System.out.println(stafflist.size());

        if (stafflist == null || stafflist.size() == 0) {
            throw new BadRequestException("Appointment full in this time " + request.getDateCollect());
        }

        Person staff = stafflist.get(0);

        Appointment appointment = appointmentMapper.AppointmentCreateRequestToAppointment(request);
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

        isAppointmentResponsitory.save(appointment);
        AppointCreateResponse appointCreateResponse = new AppointCreateResponse();
        appointCreateResponse.setAppointmentId(appointment.getAppointmentId());
        if (payment.getPaymentMethod().equals(PaymentMehtod.VNPay)) {

            appointCreateResponse.setPaymenturl(paymentService.paymentUrlVnpay(appointment.getAppointmentId(),httpServletRequest));
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




        } else if(p.getRolename().equals(RoleName.STAFF_RECEPTION))
        {

            List<String> ls = new ArrayList<>();ls.add("COMPLETE");
            List<Appointment> list1 = isAppointmentResponsitory.findALByPayment_PaymentStatusAndCurentStatusAppointmentIsIn(false,ls);
            for (Appointment appointment : list1) {

                // them thoi gian hien tai phai sau thoi gian nay thi moi hien cai nay len
                if(Work_hour(appointment.getDateCollect()).equals(p.getWork_hour()))
                {
                    appointmentList.add(appointment);
                }
            }
        }
        else

        {
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

        // staff lab cung nen hien nhung cai ma thuoc ve ca cua minh va nhung cai minh can confirm
        if ( p.getRolename().equals(RoleName.STAFF_TEST)) {
         List<Appointment> appointments   = isAppointmentResponsitory.findAllByStaffAndCurentStatusAppointmentNotIn(p, list);

         for (Appointment appointment : appointments) {
             ProcessTesting processTesting = new ProcessTesting();
             if (appointment.getSampelist().get(0).getCureStatusSample() == null) {
                  processTesting = isProcessTesting.findByOrderProcessAndSampleMethod(1, appointment.getTypeCollect());

             } else {
                 ProcessTesting curent = isProcessTesting.findOrderProcessByStatusNameAndSampleMethod(appointment.getSampelist().get(0).getCureStatusSample(), appointment.getTypeCollect());
                 processTesting = isProcessTesting.findByOrderProcessAndSampleMethod(curent.getOrderProcess() + 1, appointment.getTypeCollect());
             }
             if(p.getRolename().equals(processTesting.getPerson_confirm()))
             {
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
        List<Appointment> appointmentList = isAppointmentResponsitory.findAllByCurentStatusAppointmentNotIn(list);
        List<AppointmentResponse> appointmentResponseList = new ArrayList<>();

        for (Appointment appointment : appointmentList) {

            List<Sample> sampleList = appointment.getSampelist();
            if (sampleList != null && sampleList.size() > 0 && sampleList.get(0).getCureStatusSample() != null) {
                ProcessTesting curent = isProcessTesting.findOrderProcessByStatusNameAndSampleMethod(sampleList.get(0).getCureStatusSample(), appointment.getTypeCollect());
                ProcessTesting pro = isProcessTesting.findByOrderProcessAndSampleMethod(curent.getOrderProcess() + 1, appointment.getTypeCollect());

                if (pro.getPerson_confirm().equals(RoleName.STAFF_LAB)) {
                        Work_hour work = Work_hour(appointment.getDateCollect());
                        if(work.equals(p.getWork_hour()))
                        {
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
        Person p = isUserResponsity.findByUsername(usename);
        List<Appointment>  list = isAppointmentResponsitory.findALLByPayment_PaymentMethodAndCurentStatusAppointment(PaymentMehtod.Cash ,"WAITING FOR PAYMENT");
        List<AppointmentResponse> appointmentResponseList = new ArrayList<>();
        for (Appointment appointment : list) {
            Work_hour work = Work_hour(appointment.getDateCollect());
            if(work.equals(p.getWork_hour()))
            {
                appointmentResponseList.add(appointmentMapper.AppointmentCreateResponse(appointment));
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

}
