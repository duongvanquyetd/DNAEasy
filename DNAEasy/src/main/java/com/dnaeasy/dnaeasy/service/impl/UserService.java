package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.UserCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.UserUpdateResquest;
import com.dnaeasy.dnaeasy.dto.response.UserResponse;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.exception.BadRequestException;
import com.dnaeasy.dnaeasy.mapper.UserMapper;
import com.dnaeasy.dnaeasy.responsity.IsUserResponsity;
import com.dnaeasy.dnaeasy.service.IsUserService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import jakarta.validation.ConstraintViolationException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@Service
public class UserService implements IsUserService {
    IsUserResponsity personResponsity;
    UserMapper userMapper;
    CloudinaryUtil cloudinaryUtil;


    @Override
    public String checkUsernameEmailPhone(UserCreateRequest userCreateRequest) {
        if (personResponsity.ExistUserName(userCreateRequest.getUsername()) != null) {
            return "Username is already in use";
        } else if (personResponsity.ExistedPhone(userCreateRequest.getPhone()) != null) {
            return "Phone number is already in use";
        } else if (personResponsity.ExistedEmail(userCreateRequest.getEmail()) != null) {
            return "Email is already in use";
        }

        return null;
    }

    @Override
    public List<UserResponse> getALlCustomers() {

        List<Person> allCustomers = personResponsity.findAll();
        List<UserResponse> allCustomerResponses = new ArrayList<>();
        for (Person person : allCustomers) {
            allCustomerResponses.add(userMapper.PersonToUserResponse(person));
        }
        return allCustomerResponses;
    }

    @Override
    public UserResponse myInfor() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        Person p = personResponsity.findByUsername(name);


        return userMapper.PersonToUserResponse(p);
    }

    @Override
    public String updateUser(UserUpdateResquest userUpdateResquest) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        Person p = personResponsity.findByUsername(name);
        //    System.out.println(p);
        if (!p.getEmail().equals(userUpdateResquest.getEmail())) {

            if (personResponsity.findByEmail(userUpdateResquest.getEmail()) >= 1) {
                throw new BadRequestException("Email is already in use");
            }
        }


        if(p.getTypeLogin() == null)
        {
            if (!passwordEncoder.matches(userUpdateResquest.getOldpassword(), p.getPassword())) {
                throw new BadRequestException("Password Wrong");
            }
            if (!p.getPhone().equals(userUpdateResquest.getPhone())) {
                if (personResponsity.findByPhone(userUpdateResquest.getPhone()) >= 1) {
                    throw new BadRequestException(" Phone number is already in use");
                }
            }
        }



        p.setCity(userUpdateResquest.getCity());
        p.setName(userUpdateResquest.getName());
        p.setPhone(userUpdateResquest.getPhone());
        p.setEmail(userUpdateResquest.getEmail());
        if(userUpdateResquest.getAvatarUrl() != null) {
            p.setAvatarUrl(userUpdateResquest.getAvatarUrl());
        }

        if (userUpdateResquest.getNewpassword() != null) {
            p.setPassword(passwordEncoder.encode(userUpdateResquest.getNewpassword()));
        }
        p.setDistrict(userUpdateResquest.getDistrict());
        p.setStreets(userUpdateResquest.getStreets());
        p.setGender(userUpdateResquest.getGender());

        personResponsity.save(p);
        return "Update Success";


    }

    @Override
    public void deleteUser(int id) {
        personResponsity.deleteById(String.valueOf(id));
    }
}
