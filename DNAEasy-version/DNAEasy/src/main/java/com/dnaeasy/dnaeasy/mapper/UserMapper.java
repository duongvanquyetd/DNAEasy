package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.UserCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.AuthenctionResponse;
import com.dnaeasy.dnaeasy.dto.response.UserResponse;
import com.dnaeasy.dnaeasy.enity.Person;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "address", expression = "java(combineAddress(person))")
    AuthenctionResponse PersonToAuthenctionResponse(Person person);
    @Mapping(target = "address", expression = "java(combineAddress(person))")
    UserResponse PersonToUserResponse(Person person);

//    @Mapping(target = "departmentName", source = "department.departmentName")
//    @Mapping(target = "address", expression = "java(combineAddress(person))")
//    StaffResponse PersonToStaffResponse(Person person);

    default String combineAddress(Person person) {
        return person.getStreets() + ", " + person.getDistrict() + ", " + person.getCity();
   }

    Person PersonRequestToPerson(UserCreateRequest userCreateRequest);
}
