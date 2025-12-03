package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.ServiceCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.ServiceResponse;
import com.dnaeasy.dnaeasy.enity.Service;
import com.dnaeasy.dnaeasy.enity.ServiceImage;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-03T20:07:21+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Microsoft)"
)
@Component
public class ServiceMapperImpl implements ServiceMapper {

    @Override
    public Service toEntity(ServiceCreateRequest dto) {
        if ( dto == null ) {
            return null;
        }

        Service service = new Service();

        service.setSample_count( dto.getSample_count() );
        service.setServiceName( dto.getServiceName() );
        service.setServiceDescription( dto.getServiceDescription() );
        service.setServicePrice( dto.getServicePrice() );
        service.setTypeService( dto.getTypeService() );
        List<ServiceImage> list = dto.getServiceImageList();
        if ( list != null ) {
            service.setServiceImageList( new ArrayList<ServiceImage>( list ) );
        }

        return service;
    }

    @Override
    public ServiceCreateRequest toDTO(Service entity) {
        if ( entity == null ) {
            return null;
        }

        ServiceCreateRequest serviceCreateRequest = new ServiceCreateRequest();

        serviceCreateRequest.setServiceName( entity.getServiceName() );
        serviceCreateRequest.setServiceDescription( entity.getServiceDescription() );
        serviceCreateRequest.setServicePrice( entity.getServicePrice() );
        serviceCreateRequest.setTypeService( entity.getTypeService() );
        serviceCreateRequest.setSample_count( entity.getSample_count() );
        List<ServiceImage> list = entity.getServiceImageList();
        if ( list != null ) {
            serviceCreateRequest.setServiceImageList( new ArrayList<ServiceImage>( list ) );
        }

        return serviceCreateRequest;
    }

    @Override
    public void updateEntityFromDTO(ServiceCreateRequest dto, Service entity) {
        if ( dto == null ) {
            return;
        }

        entity.setSample_count( dto.getSample_count() );
        if ( dto.getServiceName() != null ) {
            entity.setServiceName( dto.getServiceName() );
        }
        if ( dto.getServiceDescription() != null ) {
            entity.setServiceDescription( dto.getServiceDescription() );
        }
        if ( dto.getServicePrice() != null ) {
            entity.setServicePrice( dto.getServicePrice() );
        }
        if ( dto.getTypeService() != null ) {
            entity.setTypeService( dto.getTypeService() );
        }
        if ( entity.getServiceImageList() != null ) {
            List<ServiceImage> list = dto.getServiceImageList();
            if ( list != null ) {
                entity.getServiceImageList().clear();
                entity.getServiceImageList().addAll( list );
            }
        }
        else {
            List<ServiceImage> list = dto.getServiceImageList();
            if ( list != null ) {
                entity.setServiceImageList( new ArrayList<ServiceImage>( list ) );
            }
        }
    }

    @Override
    public ServiceResponse convertToResponse(Service dto) {
        if ( dto == null ) {
            return null;
        }

        ServiceResponse.ServiceResponseBuilder serviceResponse = ServiceResponse.builder();

        serviceResponse.price( dto.getServicePrice() );
        serviceResponse.serviceId( (long) dto.getServiceId() );
        serviceResponse.serviceName( dto.getServiceName() );
        serviceResponse.serviceDescription( dto.getServiceDescription() );
        serviceResponse.typeService( dto.getTypeService() );
        serviceResponse.active( dto.isActive() );
        serviceResponse.sample_count( dto.getSample_count() );

        serviceResponse.imageUrls( getImage(dto) );

        return serviceResponse.build();
    }
}
