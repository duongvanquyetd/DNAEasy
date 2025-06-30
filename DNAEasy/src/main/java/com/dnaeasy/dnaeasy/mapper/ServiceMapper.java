package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.ServiceCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.ServiceResponse;
import com.dnaeasy.dnaeasy.enity.Service;
import com.dnaeasy.dnaeasy.enity.ServiceImage;
import org.mapstruct.*;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ServiceMapper {

    Service toEntity(ServiceCreateRequest dto);

    ServiceCreateRequest toDTO(Service entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDTO(ServiceCreateRequest dto, @MappingTarget Service entity);

    @Mapping(target = "imageUrls", expression = "java(getImage(dto))")
    @Mapping(target = "price", source = "servicePrice")

    ServiceResponse convertToResponse(Service dto);

    default List<String> getImage(Service dto) {
        List<ServiceImage> serviceImages = dto.getServiceImageList();
        List<String> imageUrls = new ArrayList<>();
        for (ServiceImage serviceImage : serviceImages) {
            imageUrls.add(serviceImage.getServiceImagePath());

        }
        return imageUrls;
    }
}
