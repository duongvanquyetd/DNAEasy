package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.SampleCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.UpdateSampleRequest;
import com.dnaeasy.dnaeasy.dto.response.SampleResponse;
import com.dnaeasy.dnaeasy.dto.response.TestprocessResponse;

import java.util.List;

public interface IsSampleService {

  List<SampleResponse> Create(SampleCreateRequest sampleCreateRequest);
  TestprocessResponse isAllowCofirmation(SampleCreateRequest sampleCreateRequest);
  String  getCurrentStatus(int appointmentid);


  List<SampleResponse> getbyAppoinment(int appointmentid);
  List<SampleResponse> UpdateSampleHaveForm(List<UpdateSampleRequest> updateSampleRequestList);

}
