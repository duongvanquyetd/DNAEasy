package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.CommentRequest;
import com.dnaeasy.dnaeasy.dto.response.CommentReponse;
import com.dnaeasy.dnaeasy.enity.Comment;
import com.dnaeasy.dnaeasy.enity.Person;
import org.mapstruct.*;
import com.dnaeasy.dnaeasy.enity.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface CommentMapper {

    @Mappings({
            @Mapping(target = "commentId", ignore = true),
            @Mapping(target = "commentDate", ignore = true),
            @Mapping(target = "customer", source = "customerId", qualifiedByName = "mapIdToPerson"),
            @Mapping(target = "service", source = "serviceId", qualifiedByName = "mapIdToService")
    })
    Comment toEntity(CommentRequest dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mappings({
            @Mapping(target = "commentContent", source = "commentContent"),
            @Mapping(target = "rating", source = "rating"),
            @Mapping(target = "commentDate", ignore = true),
            // customer & service không đổi => ignore mapping
            @Mapping(target = "customer", ignore = true),
            @Mapping(target = "service", ignore = true)
    })
    void updateEntityFromDto(CommentRequest dto, @MappingTarget Comment entity);


    @Mappings({
            @Mapping(target = "commentId",      source = "commentId"),
            @Mapping(target = "commentContent", source = "commentContent"),
            @Mapping(target = "commentDate",    source = "commentDate"),
            @Mapping(target = "rating",         source = "rating"),

            // Person → customerId, customerName
            @Mapping(target = "customerId",   source = "customer.personId"),
            @Mapping(target = "customerName", source = "customer.name"),

            // Service → serviceId, serviceName
            @Mapping(target = "serviceId",   source = "service.serviceId"),
            @Mapping(target = "serviceName", source = "service.serviceName")
    })
    CommentReponse toResponseDto(Comment entity);

    @Named("mapIdToPerson")
    default Person mapIdToPerson(Integer id) {
        if (id == null) {
            return null;
        }
        Person person = new Person();
        person.setPersonId(id);
        return person;
    }
    @Named("mapIdToService")
    default Service mapIdToService(Integer id) {
        if (id == null) {
            return null;
        }
        Service service = new Service();
        service.setServiceId(id);
        return service;
    }
    @AfterMapping
    default void setCommentDateNow(@MappingTarget Comment entity) {
        entity.setCommentDate(java.time.LocalDateTime.now());
    }

}
