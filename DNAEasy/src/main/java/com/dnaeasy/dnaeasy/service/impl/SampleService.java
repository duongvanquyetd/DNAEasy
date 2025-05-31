package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.SampleCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.TestProcessRequest;
import com.dnaeasy.dnaeasy.dto.request.UpdateSampleRequest;
import com.dnaeasy.dnaeasy.dto.response.SampleResponse;
import com.dnaeasy.dnaeasy.dto.response.TestprocessResponse;
import com.dnaeasy.dnaeasy.enity.*;
import com.dnaeasy.dnaeasy.enity.ProcessTesting;
import com.dnaeasy.dnaeasy.enums.SampleMethod;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.mapper.SampleMapper;
import com.dnaeasy.dnaeasy.responsity.IsAppointmentResponsitory;
import com.dnaeasy.dnaeasy.responsity.IsProcessTesting;
import com.dnaeasy.dnaeasy.responsity.IsSampleRespository;
import com.dnaeasy.dnaeasy.responsity.IsUserResponsity;
import com.dnaeasy.dnaeasy.service.IsSampleService;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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

    @Override
    public List<SampleResponse> Create(SampleCreateRequest sampleCreateRequest) {
        Appointment appointment = isAppointmentResponsitory.findById(sampleCreateRequest.getAppointmentId()).orElseThrow(() -> new ResourceNotFound("Appointment not found"));
        List<Sample> sampleList = new ArrayList<>();

        System.out.println(appointment.getService().getSample_count());
        for (int i = 0; i < appointment.getService().getSample_count(); i++) {
            Sample sample = new Sample();
            sample.setSamplecode(generateUniqueCode());
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
        if (sampleList.get(0).getCureStatusSample() == null) {
            ProcessTesting p = isProcessTesting.findByOrderProcessAndSampleMethod(1, appointment.getTypeCollect());
            if (person.getRolename().equals(p.getPerson_confirm())) {
                testprocessResponse.setIsallowCofirmation(true);
                testprocessResponse.setNextStatus(p.getStatusName());
                testprocessResponse.setFormfor(p.getFormfor());
            }

        } else {
            ProcessTesting curent = isProcessTesting.findOrderProcessByStatusName(sampleList.get(0).getCureStatusSample());
            ProcessTesting p = isProcessTesting.findByOrderProcessAndSampleMethod(curent.getOrderProcess() + 1, appointment.getTypeCollect());
            if (person.getRolename().equals(p.getPerson_confirm())) {
                testprocessResponse.setIsallowCofirmation(true);
                testprocessResponse.setNextStatus(p.getStatusName());
                testprocessResponse.setFormfor(p.getFormfor());
            }

        }
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
        for (Sample sample : sampleList) {
            SampleResponse sampleResponse = sampleMapper.SampeToSampleResponse(sample);
            sampleResponseList.add(sampleResponse);
        }
        return sampleResponseList;
    }

    @Override
    public List<SampleResponse> UpdateSampleHaveForm(List<UpdateSampleRequest> updateSampleRequestList) {

         int appointid = isAppointmentResponsitory.getAppointmentIDBySampleID(updateSampleRequestList.get(0).getSampleId());
        TestprocessResponse testprocessResponse = isAllowCofirmation(new SampleCreateRequest(appointid));
        List<SampleResponse> sampleResponseList = new ArrayList<>();
        if (testprocessResponse.isIsallowCofirmation()) {

            for (UpdateSampleRequest updateSampleRequest : updateSampleRequestList) {
                Sample sample = isSampleRespository.findById(updateSampleRequest.getSampleId()).orElseThrow(() -> new ResourceNotFound("Sample not found"));


                sample.setSampleType(updateSampleRequest.getSampleType());
                sample.setSampleName(updateSampleRequest.getSampleName());
                sample.setCureStatusSample(updateSampleRequest.getNextStatusName());

                SampleTracking sampleTracking = new SampleTracking();
                sampleTracking.setStatusDate(LocalDateTime.now());
                sampleTracking.setStatusName(updateSampleRequest.getNextStatusName());
                List<SampleTracking> sampleTrackingList = new ArrayList<>();
//            if (sample.getTracks() == null || sample.getTracks().size() == 0) {
//                sampleTrackingList = new ArrayList<>();
//
//            }
//            else {
//                sampleTrackingList = sample.getTracks();
                //  }
                sampleTrackingList.add(sampleTracking);

                sample.getTracks().addAll(sampleTrackingList);
                for (SampleTracking track : sample.getTracks()) {
                    track.setSample(sample);
                }
                isSampleRespository.save(sample);
                sampleResponseList.add(sampleMapper.SampeToSampleResponse(sample));

            }
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
