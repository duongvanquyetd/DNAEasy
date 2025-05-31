package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.ServiceCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.ServiceResponse;
import com.dnaeasy.dnaeasy.enity.Service;

import java.util.List;

public interface IsServiceService {
    Service create(ServiceCreateRequest request);
    List<ServiceResponse> getAll();
    ServiceResponse getById(Long id);
    Service update(Long id, ServiceCreateRequest request);
    void delete(Long id);
}
