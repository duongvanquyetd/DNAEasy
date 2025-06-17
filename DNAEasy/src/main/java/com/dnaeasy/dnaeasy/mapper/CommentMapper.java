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

    Comment toEntity(CommentRequest dto);

    @Mappings({


            // Person → customerId, customerName
            @Mapping(target = "avatarUrl",   source = "customer.avatarUrl"),
            @Mapping(target = "name", source = "customer.name"),
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
