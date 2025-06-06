package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.ServiceCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.ServiceResponse;
import com.dnaeasy.dnaeasy.enity.Service;
import com.dnaeasy.dnaeasy.enity.ServiceImage;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Mapper chuyển đổi giữa Entity Service và các DTO (Request/Response).
 */
@Component
public class ServiceMapper {


    public Service toEntity(ServiceCreateRequest request) {
        if (request == null) return null;

        Service s = new Service();
        s.setServiceName(request.getServiceName());
        s.setServiceDescription(request.getServiceDescription());
        s.setServicePrice(request.getServicePrice());
        s.setTypeService(request.getTypeService());

        // Chuyển danh sách ảnh nếu có
        List<ServiceImage> listImg = request.getServiceImageList();
        if (listImg != null) {
            // Gán parent cho từng ServiceImage
            for (ServiceImage img : listImg) {
                img.setService(s);
            }
            // Đảm bảo dùng cùng instance của list gốc (Hibernate quản lý)
            s.getServiceImageList().addAll(listImg);
        }

        return s;
    }

    /**
     * Convert Service (entity) thành ServiceResponse (DTO trả về client).
     */
    public ServiceResponse toResponse(Service s) {
        if (s == null) return null;

        ServiceResponse r = new ServiceResponse();
        r.setServiceId(Long.valueOf(s.getServiceId()));
        r.setServiceName(s.getServiceName());
        r.setServiceDescription(s.getServiceDescription());
        // Chuyển BigDecimal sang double
        if (s.getServicePrice() != null) {
            r.setPrice(s.getServicePrice().doubleValue());
        }
        r.setTypeService(s.getTypeService());

        // Lấy danh sách URL từ ServiceImage
        List<String> urls = new ArrayList<>();
        for (ServiceImage img : s.getServiceImageList()) {
            urls.add(img.getServiceImagePath());
        }
        r.setImageUrls(urls);
        return r;
    }

    /**
     * Convert List<Service> thành List<ServiceResponse>
     */
    public List<ServiceResponse> toResponseList(List<Service> services) {
        List<ServiceResponse> result = new ArrayList<>();
        if (services == null) return result;
        for (Service s : services) {
            result.add(toResponse(s));
        }
        return result;
    }
}
