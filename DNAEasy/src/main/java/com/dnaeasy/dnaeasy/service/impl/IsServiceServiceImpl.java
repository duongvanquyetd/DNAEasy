package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.ServiceCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.ServiceResponse;
import com.dnaeasy.dnaeasy.enity.Service;
import com.dnaeasy.dnaeasy.enity.ServiceImage;
import com.dnaeasy.dnaeasy.mapper.ServiceMapper;
import com.dnaeasy.dnaeasy.responsity.IsServiceResponsitory;
import org.springframework.beans.factory.annotation.Autowired;



import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service

public class IsServiceServiceImpl implements IsServiceService {
    @Autowired
    private IsServiceResponsitory serviceRepo;
    @Autowired
    private ServiceMapper serviceMapper;

    @Override
    public Service create(ServiceCreateRequest request) {
        Service s = serviceMapper.toEntity(request);
        return serviceRepo.save(s);
    }

    @Override
    public List<ServiceResponse> getAll() {
        List<Service> services = serviceRepo.findAll();
        return serviceMapper.toResponseList(services);
    }

    @Override
    public ServiceResponse getById(Long id) {
        Service s = serviceRepo.findById(id).orElse(null);
        return serviceMapper.toResponse(s);
    }

    @Override
    public Service update(Long id, ServiceCreateRequest request) {
        Service s = serviceRepo.findById(id).orElse(null);
        if (s == null) return null;
        s.setServiceName(request.getServiceName());
        s.setServiceDescription(request.getServiceDescription());
        s.setServicePrice(request.getServicePrice());
        s.setTypeService(request.getTypeService());

        s.getServiceImageList().clear();
        List<ServiceImage> newImages = request.getServiceImageList();
        if (newImages != null) {
            for (ServiceImage img : newImages) {
                img.setService(s);
            }
            s.getServiceImageList().addAll(newImages);
        }

        return serviceRepo.save(s);
    }

    @Override
    public void delete(Long id) {
        serviceRepo.deleteById(id);
    }

}
