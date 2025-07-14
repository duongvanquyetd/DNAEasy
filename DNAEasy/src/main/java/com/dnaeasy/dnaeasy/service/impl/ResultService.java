package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.ResultRequest;
import com.dnaeasy.dnaeasy.dto.request.ResultUpdateRequest;
import com.dnaeasy.dnaeasy.dto.request.StatusUpdateAppointment;
import com.dnaeasy.dnaeasy.dto.response.ResultCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.ResultResponse;
import com.dnaeasy.dnaeasy.dto.response.ResultUpdateResponse;
import com.dnaeasy.dnaeasy.enity.*;
import com.dnaeasy.dnaeasy.enums.SampleMethod;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.mapper.ResultMapper;
import com.dnaeasy.dnaeasy.responsity.*;
import com.dnaeasy.dnaeasy.service.IsResultService;
import com.dnaeasy.dnaeasy.service.IsSampleService;
import com.dnaeasy.dnaeasy.util.EmailSender;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ResultService implements IsResultService {
    @Autowired
    IsResultResponsitory isResultResponsitory;
    @Autowired
    IsAppointmentResponsitory isAppointmentResponsitory;
    @Autowired
    IsProcessTesting isProcessTesting;
    @Autowired
    ResultMapper resultMapper;
    @Autowired
    IsUserResponsity isUserResponsity;
    @Autowired
    IsSampleRespository isSampleRespository;
    @Autowired
    AppointmentService appointmentService;
    @Autowired
    EmailSender emailSender;
    @Autowired
    NotificationService notificationService;


    @Override
    public List<ResultCreateResponse> createResult(ResultRequest resultRequest) {
        Appointment a = isAppointmentResponsitory.findById(resultRequest.getAppoinmentId()).orElseThrow(() -> new ResourceNotFound("Not have an appointment with id " + resultRequest.getAppoinmentId()));
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Person staff = isUserResponsity.findByUsername(username);
        List<ResultCreateResponse> resultCreateRespons = new ArrayList<>();
        List<Sample> samples = a.getSampelist();
        if (samples.size() == 1) {


            ProcessTesting status = isProcessTesting.findOrderProcessByStatusNameAndSampleMethod(samples.getFirst().getCureStatusSample(), a.getTypeCollect());
            ProcessTesting p = isProcessTesting.findByOrderProcessAndSampleMethod(status.getOrderProcess() + 1, a.getTypeCollect());
            Result result = new Result();
            result.setCurentStatusResult(p.getStatusName());
            result.getSampelist().addAll(a.getSampelist());
            result.setStaff(staff);
            result.setResultTime(LocalDateTime.now());
            samples.getFirst().getResult().add(result);
            resultCreateRespons.add(resultMapper.resultToResponse(isResultResponsitory.save(result)));
        }
else{

        for (int i = 0; i < samples.size(); i++) {
            for (int j = i + 1; j < samples.size(); j++) {
                Sample s1 = samples.get(i);
                Sample s2 = samples.get(j);
                if (!s1.getSamplecode().equals(s2.getSamplecode())) {
                    List<Sample> sampleList = new ArrayList<>();
                    sampleList.add(s1);
                    sampleList.add(s2);
                    Result result = new Result();

                    ProcessTesting status = isProcessTesting.findOrderProcessByStatusNameAndSampleMethod(s1.getCureStatusSample(), a.getTypeCollect());
                    ProcessTesting p = isProcessTesting.findByOrderProcessAndSampleMethod(status.getOrderProcess() + 1, a.getTypeCollect());
                    result.setCurentStatusResult(p.getStatusName());
                    result.getSampelist().addAll(sampleList);
                    result.setStaff(staff);
                    s1.getResult().add(result);
                    s2.getResult().add(result);
                    resultCreateRespons.add(resultMapper.resultToResponse(isResultResponsitory.save(result)));
                }
            }
        }
        }
        return resultCreateRespons;
    }

    @Override
    public List<ResultUpdateResponse> UpdateResult(List<ResultUpdateRequest> request) {


        List<ResultUpdateResponse> responses = new ArrayList<>();
        List<ProcessTesting> processTestings = new ArrayList<>();
        for (ResultUpdateRequest updateRequest : request) {
            Result result = isResultResponsitory.findResultsByResultId(updateRequest.getResultId());

            result.setConclustionResult(updateRequest.getConclustionResult());
            result.setResulFilePDF(updateRequest.getResulFilePDF());

            SampleMethod type = result.getSampelist().iterator().next().getAppointment().getTypeCollect();
            result.setResultTime(LocalDateTime.now());
            processTestings = isProcessTesting.findAllBySampleMethod(type);
            result.setCurentStatusResult(processTestings.getLast().getStatusName());


            isResultResponsitory.save(result);
            responses.add(resultMapper.resultToUpdateResponse(result));
        }
// cap nhap trang thai appointment
        Result resultt = isResultResponsitory.findResultsByResultId(request.get(0).getResultId());
        Appointment appointment = isAppointmentResponsitory.findById(resultt.getSampelist().iterator().next().getAppointment().getAppointmentId()).orElseThrow(() -> new ResourceNotFound("Not Have AppointmentId"));
        StatusUpdateAppointment newAppointment = new StatusUpdateAppointment();
        newAppointment.setAppointmentId(appointment.getAppointmentId());
        newAppointment.setStatus("COMPLETE");
        newAppointment.setNote(appointment.getNote());


        Result a = isResultResponsitory.findResultsByResultId(request.get(0).getResultId());
        Appointment appointment1 = a.getSampelist().iterator().next().getAppointment();


        try {
            emailSender.SendMail(appointment1.getEmailAppointment());
        } catch (Exception e) {
            new RuntimeException(e);
        }
       notificationService.createNotification(appointment1.getCustomer(),"Booking service  "+appointment1.getService().getServiceName()+"Resulted please history booking to view result" );


        appointmentService.UpdateStatusAppoinment(newAppointment, null);
        return responses;
    }

    @Override
    public List<ResultResponse> getResultByAppointmentID(ResultRequest resultRequest) {
        List<ResultResponse> responses = new ArrayList<>();

        Appointment appointment = isAppointmentResponsitory.findById(resultRequest.getAppoinmentId()).orElseThrow(() -> new ResourceNotFound("Not have an appointment with id " + resultRequest.getAppoinmentId()));
        if (appointment.getCurentStatusAppointment().equals("CANCLE"))// khong co result
        {
            return null;
        }
        List<Result> results = new ArrayList<>();
        List<Sample> samples = appointment.getSampelist();
        for (Sample sample : samples) {
            results.addAll(sample.getResult());
        }
        for (int i = 0; i < results.size(); i++) {

            for (int j = i + 1; j < results.size(); j++) {
                if (results.get(i).getResultId() == results.get(j).getResultId()) {
                    results.remove(j);
                }
            }
        }


        for (Result result : results) {
            responses.add(resultMapper.resultToResultResponse(result));
        }


        return responses;
    }

}
