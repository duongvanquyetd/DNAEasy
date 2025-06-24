package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.SearchRequest;
import com.dnaeasy.dnaeasy.dto.request.ServiceCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.ManagerServiceReponse;
import com.dnaeasy.dnaeasy.dto.response.ServiceResponse;
import com.dnaeasy.dnaeasy.enity.Service;
import com.dnaeasy.dnaeasy.enity.ServiceImage;
import com.dnaeasy.dnaeasy.exception.BadRequestException;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.mapper.ServiceMapper;
import com.dnaeasy.dnaeasy.responsity.IsServiceResponsitory;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
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
    private CloudinaryUtil cloudinaryUtil;

    @Override
    public ServiceResponse create(ServiceCreateRequest request, List<MultipartFile> files) {
        // Chỉ thực hiện mapping DTO -> Entity và lưu, không xử lý ảnh ở đây
        Service entity = serviceMapper.toEntity(request);


        int cout = serviceRepo.countByServiceNameAndActive(request.getServiceName(), true);
        if (cout > 0) {
            throw new BadRequestException("Service name already exists");
        }
        List<ServiceImage> imgs = new ArrayList<>();

        try {
            if (files != null) {
                for (MultipartFile file : files) {
                    ServiceImage img = new ServiceImage();
                    img.setServiceImageName(file.getOriginalFilename());
                    img.setServiceImagePath(cloudinaryUtil.uploadImage(file));
                    img.setService(entity);
                    imgs.add(img);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        entity.getServiceImageList().addAll(imgs);

        return serviceMapper.convertToResponse(serviceRepo.save(entity));
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
        return (s == null) ? null : serviceMapper.convertToResponse(s);
    }

    @Override
    public ServiceResponse update(Long id, ServiceCreateRequest request, List<MultipartFile> files, List<String> removeimg) {
        Service s = serviceRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Không tìm thấy service " + id));

        if (!s.getServiceName().equals(request.getServiceName())) {

            int cout = serviceRepo.countByServiceNameAndActive(request.getServiceName(), true);
            if (cout > 0) {
                throw new BadRequestException("Service name already exists");
            }
        }

        // Cập nhật các trường text
        s.setServiceName(request.getServiceName());
        s.setServiceDescription(request.getServiceDescription());
        s.setServicePrice(request.getServicePrice());
        s.setTypeService(request.getTypeService());
        s.setSample_count(request.getSample_count());

        if (removeimg != null && removeimg.size() > 0 && s.getServiceImageList().size() > 0) {
            for (int j = 0; j < removeimg.size(); j++) {
                for (int i = 0; i < s.getServiceImageList().size(); i++) {

                    if (s.getServiceImageList().get(i).getServiceImagePath().equals(removeimg.get(j))) {
                        s.getServiceImageList().remove(i);
                    }

                }
            }

        }


        List<ServiceImage> imgs = new ArrayList<>();
        try {
            if (files != null) {

                for (MultipartFile file : files) {
                    ServiceImage img = new ServiceImage();
                    img.setServiceImageName(file.getOriginalFilename());
                    img.setServiceImagePath(cloudinaryUtil.uploadImage(file));
                    img.setService(s);
                    imgs.add(img);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        s.getServiceImageList().addAll(imgs);

        // Save và trả về
        return serviceMapper.convertToResponse(serviceRepo.save(s));
    }

    @Override
    public void delete(Long id) {
        Service s = serviceRepo.findById(id).orElseThrow(() -> {
            throw new BadRequestException("Do not have this service with id" + id);
        });
        s.setActive(false);
        serviceRepo.save(s);
    }

    @Override
    public Page<ServiceResponse> search(SearchRequest request, Pageable pageable, boolean active) {
        Page<Service> services = null;
        if (!request.getKeywordType().trim().isEmpty() && !request.getKeywordSearch().trim().isEmpty()) {
            services = serviceRepo.findByTypeServiceContainingIgnoreCaseAndServiceNameContainingAndActive(request.getKeywordType(), request.getKeywordSearch(), active, pageable);
        } else if (request.getKeywordType().trim().isEmpty() && !request.getKeywordSearch().trim().isEmpty()) {
            services = serviceRepo.findByServiceNameContainingIgnoreCaseAndActive(request.getKeywordSearch(), active, pageable);
        } else if (!request.getKeywordType().trim().isEmpty() && request.getKeywordSearch().trim().isEmpty()) {
            services = serviceRepo.findByTypeServiceContainingIgnoreCaseAndActive(request.getKeywordType(), active, pageable);
        } else {
            services = serviceRepo.findAllByActive(active, pageable);
        }


        Page<ServiceResponse> responses = services.map(
                serviceMapper::convertToResponse);


        return responses;
    }

    @Override
    public ManagerServiceReponse report() {


        ManagerServiceReponse reponse = new ManagerServiceReponse();
        reponse.setCount(serviceRepo.count());
        reponse.setTotalamount(serviceRepo.totalprice());
        reponse.setAvgamount(serviceRepo.avgamount());
        reponse.setActive(serviceRepo.countByActive(true));
        reponse.setInactive(serviceRepo.countByActive(false));

        return reponse;
    }

    @Override
    public ServiceResponse Active(Long id) {

        Service s = serviceRepo.findById(id).orElseThrow(() -> {
                    throw new BadRequestException("Do not have this service with id" + id);
                }

        );

        s.setActive(true);
        return serviceMapper.convertToResponse(serviceRepo.save(s));
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
