package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.SampleCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.TestProcessRequest;
import com.dnaeasy.dnaeasy.dto.request.UpdateSampleRequest;
import com.dnaeasy.dnaeasy.dto.response.SampleResponse;
import com.dnaeasy.dnaeasy.dto.response.TestprocessResponse;
import com.dnaeasy.dnaeasy.enity.*;
import com.dnaeasy.dnaeasy.enity.ProcessTesting;
import com.dnaeasy.dnaeasy.enums.RoleName;
import com.dnaeasy.dnaeasy.enums.SampleMethod;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.mapper.SampleMapper;
import com.dnaeasy.dnaeasy.responsity.*;
import com.dnaeasy.dnaeasy.service.IsSampleService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class SampleService implements IsSampleService {
    @Autowired
    private IsSampleRespository isSampleRespository;
    @Autowired
    private IsAppointmentResponsitory isAppointmentResponsitory;
    @Autowired
    private SampleMapper sampleMapper;
    @Autowired
    private IsUserResponsity isUserResponsity;
    @Autowired
    private IsProcessTesting isProcessTesting;
    @Autowired
    private IsPersonTesting isPersonTesting;
    @Autowired
    CloudinaryUtil cloudinaryUtil;
    @Autowired
    IsSampleTrackingReponsitory isSampleTrackingReponsitory;

    @Autowired
    NotificationService notificationService;

    @Override
    public List<SampleResponse> Create(SampleCreateRequest sampleCreateRequest) {


        Appointment appointment = isAppointmentResponsitory.findById(sampleCreateRequest.getAppointmentId()).orElseThrow(() -> new ResourceNotFound("Appointment not found"));
        List<Sample> sampleList = new ArrayList<>();

        System.out.println(appointment.getService().getSample_count());
        for (int i = 0; i < appointment.getService().getSample_count(); i++) {
            Sample sample = new Sample();
            sample.setSamplecode(generateCode());
            sample.setAppointment(appointment);
            sampleList.add(sample);
        }
        System.out.println("size" + sampleList.size());
        appointment.getSampelist().addAll(sampleList);
        isAppointmentResponsitory.save(appointment);
        List<SampleResponse> sampleResponseList = new ArrayList<>();
        for (Sample sample : appointment.getSampelist()) {

            sampleResponseList.add(sampleMapper.SampeToSampleResponse(sample));
        }
        // Notification
        String user = SecurityContextHolder.getContext().getAuthentication().getName();
        Person p = isUserResponsity.findByUsername(user);
       notificationService.createNotification(p, "Booking Appointment Sucessfully");


        //Notification
        return sampleResponseList;
    }

    @Override
    public TestprocessResponse isAllowCofirmation(SampleCreateRequest sampleCreateRequest) {
        Appointment appointment = isAppointmentResponsitory.findById(sampleCreateRequest.getAppointmentId()).orElseThrow(() -> new ResourceNotFound("Appointment not found"));
        List<Sample> sampleList = appointment.getSampelist();
        String usename = SecurityContextHolder.getContext().getAuthentication().getName();
        Person person = isUserResponsity.findByUsername(usename);
        TestprocessResponse testprocessResponse = new TestprocessResponse();
        testprocessResponse.setIsallowCofirmation(false);
        if (sampleList == null || sampleList.size() == 0) {
            testprocessResponse.setIsallowCofirmation(false);
            testprocessResponse.setNextStatus("Pay To Continue");
            return testprocessResponse;
        }
        // gim lai de test da chu toi khong confirm de test duoc
//        if( LocalDate.now().isBefore(appointment.getDateCollect().toLocalDate()))
//        {
//            testprocessResponse.setIsallowCofirmation(false);
//            return testprocessResponse;
//        }

        ProcessTesting p = null;
        if (sampleList.get(0).getCureStatusSample() == null) {
             p = isProcessTesting.findByOrderProcessAndSampleMethod(1, appointment.getTypeCollect());

            // ty kiem tra tiep xem ngay hom nay co phai ngay dat lich khong neu phai thi moi cho sua status
            if (person.getRolename().equals(p.getPerson_confirm())) {
                testprocessResponse.setIsallowCofirmation(true);
                testprocessResponse.setNextStatus(p.getStatusName());
                testprocessResponse.setFormfor(p.getFormfor());

            }

        } else {
            ProcessTesting curent = isProcessTesting.findOrderProcessByStatusNameAndSampleMethod(sampleList.get(0).getCureStatusSample(), appointment.getTypeCollect());
             p = isProcessTesting.findByOrderProcessAndSampleMethod(curent.getOrderProcess() + 1, appointment.getTypeCollect());
            if (person.getRolename().equals(p.getPerson_confirm())) {
                testprocessResponse.setIsallowCofirmation(true);
                testprocessResponse.setNextStatus(p.getStatusName());
                testprocessResponse.setFormfor(p.getFormfor());

            }

        }
        testprocessResponse.setRole(p.getPerson_confirm());//
        return testprocessResponse;

    }

    @Override
    public String getCurrentStatus(int appointmentid) {


        Appointment appointmnet = isAppointmentResponsitory.findById(appointmentid).orElseThrow(() -> new ResourceNotFound("Appointment not found"));

        return appointmnet.getSampelist().get(0).getCureStatusSample();
    }

    @Override
    public List<SampleResponse> getbyAppoinment(int appointmentid) {
        Appointment appointmnet = isAppointmentResponsitory.findById(appointmentid).orElseThrow(() -> new ResourceNotFound("Appointment not found"));
        List<Sample> sampleList = appointmnet.getSampelist();
        List<SampleResponse> sampleResponseList = new ArrayList<>();
        if (sampleList == null) {
            return sampleResponseList;
        }

        for (Sample sample : sampleList) {
            SampleResponse sampleResponse = sampleMapper.SampeToSampleResponse(sample);

            sampleResponseList.add(sampleResponse);
        }
        return sampleResponseList;
    }

    @Override
    public List<SampleResponse> UpdateSampleHaveForm(List<UpdateSampleRequest> updateSampleRequestList, MultipartFile file) {

        int appointid = isAppointmentResponsitory.getAppointmentIDBySampleID(updateSampleRequestList.get(0).getSampleId());
        TestprocessResponse testprocessResponse = isAllowCofirmation(new SampleCreateRequest(appointid));
        List<SampleResponse> sampleResponseList = new ArrayList<>();
        if (testprocessResponse.isIsallowCofirmation()) {
            SampleTracking sampleTracking = new SampleTracking();
            sampleTracking.setStatusDate(LocalDateTime.now());
            sampleTracking.setStatusName(updateSampleRequestList.get(0).getNextStatusName());
            if (file != null) {

                try {

                    sampleTracking.setImageUrl(cloudinaryUtil.uploadImage(file));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            for (UpdateSampleRequest updateSampleRequest : updateSampleRequestList) {
                Sample sample = isSampleRespository.findById(updateSampleRequest.getSampleId()).orElseThrow(() -> new ResourceNotFound("Sample not found"));


                sample.setSampleType(updateSampleRequest.getSampleType());
                sample.setCureStatusSample(updateSampleRequest.getNextStatusName());


                if (sample.getPersonTest() == null && updateSampleRequest.getName() != null) {
                    PersonTest p = new PersonTest();

                    p.setCCCD(updateSampleRequest.getCCCD());
                    p.setName(updateSampleRequest.getName());
                    p.setRelationName(updateSampleRequest.getRelationName());
                    p.setSample(sample);

                    sample.setPersonTest(p);
                }
                sample.getSampleTracking().add(sampleTracking);
                sampleTracking.getSample().add(sample);


                sampleResponseList.add(sampleMapper.SampeToSampleResponse(sample));

            }


            isSampleTrackingReponsitory.save(sampleTracking);
            // Notification
            String user = SecurityContextHolder.getContext().getAuthentication().getName();
            Person p = isUserResponsity.findByUsername(user);
            TestprocessResponse tp = isAllowCofirmation(new SampleCreateRequest(appointid));
            System.out.println("Test process"+tp);
            Appointment a = isAppointmentResponsitory.findById(appointid).orElseThrow(() -> new ResourceNotFound("Appointment not found"));
            if (p.getRolename().equals(RoleName.CUSTOMER)) {
                if (tp.getRole().equals(RoleName.STAFF_TEST)) {
                    if (a.getStaff() != null) {

                       notificationService.createNotification(a.getStaff(), updateSampleRequestList.get(0).getNextStatusName() + " Confirmed the process is " + tp.getNextStatus());

                    }
                }
            }
            else {
              notificationService.createNotification(a.getCustomer(), updateSampleRequestList.get(0).getNextStatusName() + " Confirmed the next process  is " + tp.getNextStatus()+"do by "+tp.getRole());

            }
            //Notification
        }


        return sampleResponseList;
    }


    public String generateUniqueCode() {
        String code;
        do {
            code = generateCode();
        } while (isSampleRespository.existsSampleBySamplecode(code)); // kiểm tra trùng trong DB
        return code;
    }

    public String generateCode() {
        int CODE_LENGTH = 6;
        Random random = new Random();
        String CHAR_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < CODE_LENGTH; i++) {
            int index = random.nextInt(CHAR_POOL.length());
            sb.append(CHAR_POOL.charAt(index));
        }
        return sb.toString();
    }


}
