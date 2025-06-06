package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.ResultRequest;
import com.dnaeasy.dnaeasy.dto.request.ResultUpdateRequest;
import com.dnaeasy.dnaeasy.dto.response.ResultResponse;
import com.dnaeasy.dnaeasy.dto.response.ResultUpdateResponse;
import com.dnaeasy.dnaeasy.enity.*;
import com.dnaeasy.dnaeasy.enums.SampleMethod;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.mapper.ResultMapper;
import com.dnaeasy.dnaeasy.responsity.*;
import com.dnaeasy.dnaeasy.service.IsResultService;
import com.dnaeasy.dnaeasy.service.IsUserService;
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

    @Override
    public List<ResultResponse> createResult(ResultRequest resultRequest) {
        Appointment a = isAppointmentResponsitory.findById(resultRequest.getAppoinmentId()).orElseThrow(() -> new ResourceNotFound("Not have an appointment with id " + resultRequest.getAppoinmentId()));
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Person staff = isUserResponsity.findByUsername(username);
        List<ResultResponse> resultResponses = new ArrayList<>();
        List<Sample> samples = a.getSampelist();
        for (int i = 0; i < samples.size(); i++) {
            for (int j = i + 1; j < samples.size(); j++) {
                Sample s1 = samples.get(i);
                Sample s2 = samples.get(j);
                if (!s1.getSamplecode().equals(s2.getSamplecode())) {
                    List<Sample> sampleList = new ArrayList<>();
                    sampleList.add(s1);
                    sampleList.add(s2);
                    Result result = new Result();
                    ProcessTesting status = isProcessTesting.findOrderProcessByStatusName(s1.getCureStatusSample());
                    ProcessTesting p = isProcessTesting.findByOrderProcessAndSampleMethod(status.getOrderProcess() + 1, a.getTypeCollect());
                    result.setCurentStatusResult(p.getStatusName());
                    result.getSampelist().addAll(sampleList);

                    result.setStaff(staff);
                    s1.setResult(result);
                    s2.setResult(result);
                    isResultResponsitory.save(result);
                    resultResponses.add(resultMapper.resultToResponse(result));
                }
            }
        }
        return resultResponses;
    }

    @Override
    public List<ResultUpdateResponse> UpdateResult(List<ResultUpdateRequest> request) {
    List<ResultUpdateResponse> responses = new ArrayList<>();
        for (ResultUpdateRequest updateRequest : request) {
            Result result = isResultResponsitory.findResultsByResultId(updateRequest.getResultId());

            result.setConclustionResult(updateRequest.getConclustionResult());
            result.setResulFilePDF(updateRequest.getResulFilePDF());

            SampleMethod type = result.getSampelist().get(0).getAppointment().getTypeCollect();
            result.setResultTime(LocalDateTime.now());
            List<ProcessTesting> processTestings = isProcessTesting.findAllBySampleMethod(type);
            result.setCurentStatusResult(processTestings.getLast().getStatusName());
            isResultResponsitory.save(result);
            responses.add(resultMapper.resultToUpdateResponse(result));
        }


        return responses;
    }

}
