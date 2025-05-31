package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.ServiceCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.ServiceResponse;
import com.dnaeasy.dnaeasy.enity.Service;
import com.dnaeasy.dnaeasy.enity.ServiceImage;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.responsity.IsServiceResponsitory;
import org.springframework.beans.factory.annotation.Autowired;



import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service

public class IsServiceServiceImpl implements IsServiceService {
    @Autowired
    private IsServiceResponsitory serviceRepo;


    @Override
    public Service create(ServiceCreateRequest request) {
        Service s = new Service();
        s.setServiceName(request.getServiceName());
        s.setServiceDescription(request.getServiceDescription());
        s.setServicePrice(request.getServicePrice());

        s.setTypeService(request.getTypeService());
        // Gán quan hệ ảnh
        for (ServiceImage img : request.getServiceImageList()) {
            img.setService(s);
        }
        s.setServiceImageList(request.getServiceImageList());
        return serviceRepo.save(s);
    }

    @Override
    public List<ServiceResponse> getAll() {
        List<Service> services = serviceRepo.findAll();
        List<ServiceResponse> responses = new ArrayList<>();
        for (Service s : services) responses.add(convertToResponse(s));
        return responses;
    }

    @Override
    public ServiceResponse getById(Long id) {
        Service s = serviceRepo.findById(id).orElse(null);
        return (s == null) ? null : convertToResponse(s);
    }

    @Override
    public Service update(Long id, ServiceCreateRequest request) {
        Service s = serviceRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Không tìm thấy service " + id));

        // Cập nhật các trường text
        s.setServiceName(request.getServiceName());
        s.setServiceDescription(request.getServiceDescription());
        s.setServicePrice(request.getServicePrice());
        s.setTypeService(request.getTypeService());

        // 1. Xoá hết phần tử trong list cũ
        List<ServiceImage> images = s.getServiceImageList();
        images.clear();

        // 2. Chuẩn bị list ảnh mới (đã setService ở trên controller)
        List<ServiceImage> newImages = request.getServiceImageList();
        for (ServiceImage img : newImages) {
            img.setService(s);   // gắn ngược về parent
        }

        // 3. Thêm tất cả ảnh mới vào cùng instance của list gốc
        images.addAll(newImages);

        // Save và trả về
        return serviceRepo.save(s);
    }

    @Override
    public void delete(Long id) {
        serviceRepo.deleteById(id);
    }
    private ServiceResponse convertToResponse(Service s) {
        ServiceResponse r = new ServiceResponse();
        r.setServiceId(Long.valueOf(s.getServiceId()));             // ID dùng getter đúng tên field
        r.setServiceName(s.getServiceName());
        r.setServiceDescription(s.getServiceDescription());
        r.setPrice(s.getServicePrice().doubleValue());   // gọi setPrice,
        r.setTypeService(s.getTypeService());

        List<String> urls = new ArrayList<>();
        for (ServiceImage img : s.getServiceImageList()) {
            urls.add(img.getBlogImagePath());            // dùng getter đúng tên đường dẫn ảnh
        }
        r.setImageUrls(urls);
        return r;
    }
}
