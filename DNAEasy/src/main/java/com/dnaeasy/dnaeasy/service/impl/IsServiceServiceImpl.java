package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.SearchRequest;
import com.dnaeasy.dnaeasy.dto.request.ServiceCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.ServiceResponse;
import com.dnaeasy.dnaeasy.enity.Service;
import com.dnaeasy.dnaeasy.enity.ServiceImage;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.mapper.ServiceMapper;
import com.dnaeasy.dnaeasy.responsity.IsServiceResponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;


import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class IsServiceServiceImpl implements IsServiceService {
    @Autowired
    private IsServiceResponsitory serviceRepo;

    @Autowired
    private ServiceMapper serviceMapper;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Override
    public Service create(ServiceCreateRequest request) {
        // Chỉ thực hiện mapping DTO -> Entity và lưu, không xử lý ảnh ở đây
        Service entity = serviceMapper.toEntity(request);
        return serviceRepo.save(entity);
    }

    public Service createService(ServiceCreateRequest dto, MultipartFile imageFile) {
        Service entity = serviceMapper.toEntity(dto);

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = cloudinaryService.uploadFile(imageFile);

            // 1. Tạo một instance của ServiceImage (lớp nhóm đã code sẵn)
            ServiceImage img = new ServiceImage();
            img.setServiceImagePath(imageUrl);      // set đường dẫn ảnh lên field bLogImagePath
            img.setServiceImageName(imageFile.getOriginalFilename()); // (nếu muốn lưu tên file)
            img.setService(entity);              // gán quan hệ ManyToOne về Service cha

            // 2. Put vào List<ServiceImage> rồi gán cho entity
            List<ServiceImage> listImg = new ArrayList<>();
            listImg.add(img);
            entity.setServiceImageList(listImg);
        }

        return serviceRepo.save(entity);
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

    @Override
    public Page<ServiceResponse> search(SearchRequest request, Pageable pageable) {
        Page<Service> services = null;
        if(request.getKeywordType() != null && request.getKeywordSearch() != null)
        {
            services = serviceRepo.findByTypeServiceContainingIgnoreCaseAndServiceNameContaining(request.getKeywordType(), request.getKeywordSearch(),pageable);
        }
       else if(request.getKeywordType() == null && request.getKeywordSearch() != null)
       {
           services = serviceRepo.findByServiceNameContainingIgnoreCase(request.getKeywordSearch(),pageable);
       }else if(request.getKeywordType() != null && request.getKeywordSearch() == null)
       {
           services = serviceRepo.findByTypeServiceContainingIgnoreCase(request.getKeywordType(),pageable);
       }
       else {
            services = serviceRepo.findAll(pageable);
        }




        Page<ServiceResponse> responses = services.map(
                   serviceMapper::convertToResponse);




        return responses;
    }

    private ServiceResponse convertToResponse(Service s) {
        ServiceResponse r = new ServiceResponse();
        r.setServiceId(Long.valueOf(s.getServiceId()));             // ID dùng getter đúng tên field
        r.setServiceName(s.getServiceName());
        r.setServiceDescription(s.getServiceDescription());
        r.setPrice(s.getServicePrice());   // gọi setPrice,
        r.setTypeService(s.getTypeService());

        List<String> urls = new ArrayList<>();
        for (ServiceImage img : s.getServiceImageList()) {
            urls.add(img.getServiceImagePath());            // dùng getter đúng tên đường dẫn ảnh
        }
        r.setImageUrls(urls);
        return r;
    }
}
