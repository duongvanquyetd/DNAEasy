package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.SearchRequest;
import com.dnaeasy.dnaeasy.dto.request.ServiceCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.ManagerServiceReponse;
import com.dnaeasy.dnaeasy.dto.response.ServiceResponse;
import com.dnaeasy.dnaeasy.enity.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IsServiceService {
    ServiceResponse create(ServiceCreateRequest request, List<MultipartFile> fileLits);
    List<ServiceResponse> getAll();
    ServiceResponse getById(Long id);
    ServiceResponse update(Long id, ServiceCreateRequest request,List<MultipartFile> fileLits,List<String> removeimg);
    void delete(Long id);
    Page<ServiceResponse> search(SearchRequest request, Pageable pageable,boolean active);
    ManagerServiceReponse report ();
    ServiceResponse Active(Long id);
}
