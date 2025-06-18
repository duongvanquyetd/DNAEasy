package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.SearchRequest;
import com.dnaeasy.dnaeasy.dto.request.ServiceCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.ServiceResponse;
import com.dnaeasy.dnaeasy.enity.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IsServiceService {
    Service create(ServiceCreateRequest request);
    List<ServiceResponse> getAll();
    ServiceResponse getById(Long id);
    Service update(Long id, ServiceCreateRequest request);
    void delete(Long id);
    Page<ServiceResponse> search(SearchRequest request, Pageable pageable);
}
