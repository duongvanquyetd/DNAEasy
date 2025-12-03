package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.UserCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.AuthenctionResponse;
import com.dnaeasy.dnaeasy.dto.response.StaffResponse;
import com.dnaeasy.dnaeasy.dto.response.UserFilterRespone;
import com.dnaeasy.dnaeasy.dto.response.UserResponse;
import com.dnaeasy.dnaeasy.enity.Person;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-03T20:07:21+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Microsoft)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public AuthenctionResponse PersonToAuthenctionResponse(Person person) {
        if ( person == null ) {
            return null;
        }

        AuthenctionResponse authenctionResponse = new AuthenctionResponse();

        authenctionResponse.setRolename( person.getRolename() );

        return authenctionResponse;
    }

    @Override
    public UserResponse PersonToUserResponse(Person person) {
        if ( person == null ) {
            return null;
        }

        UserResponse userResponse = new UserResponse();

        userResponse.setPersonId( person.getPersonId() );
        userResponse.setName( person.getName() );
        userResponse.setPhone( person.getPhone() );
        userResponse.setGender( person.getGender() );
        userResponse.setAvatarUrl( person.getAvatarUrl() );
        userResponse.setEmail( person.getEmail() );
        userResponse.setWork_hour( person.getWork_hour() );
        userResponse.setRolename( person.getRolename() );
        userResponse.setTypeLogin( person.getTypeLogin() );

        userResponse.setAddress( combineAddress(person) );

        return userResponse;
    }

    @Override
    public Person PersonRequestToPerson(UserCreateRequest userCreateRequest) {
        if ( userCreateRequest == null ) {
            return null;
        }

        Person person = new Person();

        person.setPhone( userCreateRequest.getPhone() );
        person.setName( userCreateRequest.getName() );
        person.setPassword( userCreateRequest.getPassword() );
        person.setGender( userCreateRequest.getGender() );
        person.setStreets( userCreateRequest.getStreets() );
        person.setCity( userCreateRequest.getCity() );
        person.setDistrict( userCreateRequest.getDistrict() );
        person.setAvatarUrl( userCreateRequest.getAvatarUrl() );
        person.setUsername( userCreateRequest.getUsername() );
        person.setEmail( userCreateRequest.getEmail() );

        return person;
    }

    @Override
    public StaffResponse PersonToStaffResponse(Person person) {
        if ( person == null ) {
            return null;
        }

        StaffResponse staffResponse = new StaffResponse();

        staffResponse.setPersonId( String.valueOf( person.getPersonId() ) );
        staffResponse.setName( person.getName() );
        staffResponse.setPhone( person.getPhone() );
        staffResponse.setGender( person.getGender() );
        if ( person.getWork_hour() != null ) {
            staffResponse.setWork_hour( person.getWork_hour().name() );
        }
        staffResponse.setRolename( person.getRolename() );
        staffResponse.setAvatarUrl( person.getAvatarUrl() );
        staffResponse.setEmail( person.getEmail() );

        staffResponse.setAddress( combineAddress(person) );

        return staffResponse;
    }

    @Override
    public UserFilterRespone UserToUserFilterRespone(Person user) {
        if ( user == null ) {
            return null;
        }

        UserFilterRespone userFilterRespone = new UserFilterRespone();

        userFilterRespone.setPersonId( user.getPersonId() );
        userFilterRespone.setName( user.getName() );
        userFilterRespone.setRolename( user.getRolename() );
        if ( user.getActive() != null ) {
            userFilterRespone.setActive( user.getActive() );
        }
        userFilterRespone.setCreatedDate( user.getCreatedDate() );
        userFilterRespone.setAvatarUrl( user.getAvatarUrl() );

        return userFilterRespone;
    }
}
