package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.ResultRequest;
import com.dnaeasy.dnaeasy.dto.request.ResultUpdateRequest;
import com.dnaeasy.dnaeasy.dto.response.ResultCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.ResultResponse;
import com.dnaeasy.dnaeasy.dto.response.ResultUpdateResponse;

import java.util.List;

public interface IsResultService {
    List<ResultCreateResponse> createResult(ResultRequest resultRequest) ;
    List<ResultUpdateResponse> UpdateResult(List<ResultUpdateRequest> resultUpdateRequest);
    List<ResultResponse> getResultByAppointmentID(ResultRequest resultRequest);
}
