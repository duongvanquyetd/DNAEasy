package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.*;
import com.dnaeasy.dnaeasy.dto.response.StaffResponse;
import com.dnaeasy.dnaeasy.dto.response.UserFilterRespone;
import com.dnaeasy.dnaeasy.dto.response.UserReportReponse;
import com.dnaeasy.dnaeasy.dto.response.UserResponse;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.enums.RoleName;
import com.dnaeasy.dnaeasy.exception.BadRequestException;
import com.dnaeasy.dnaeasy.mapper.UserMapper;
import com.dnaeasy.dnaeasy.responsity.IsAppointmentResponsitory;
import com.dnaeasy.dnaeasy.responsity.IsUserResponsity;
import com.dnaeasy.dnaeasy.service.IsUserService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import jakarta.validation.ConstraintViolationException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@AllArgsConstructor
@Service
public class UserService implements IsUserService {
    IsUserResponsity personResponsity;
    UserMapper userMapper;
    CloudinaryUtil cloudinaryUtil;
    IsAppointmentResponsitory isAppointmentResponsitory;

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


        if (p.getTypeLogin() == null) {
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
        if (userUpdateResquest.getAvatarUrl() != null) {
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

    @Override
    public List<UserReportReponse> listUser(PersonRequest request) {
        LocalDateTime start;
        LocalDateTime end;

        if (request.getDate() != null) {
            start = request.getDate().atStartOfDay();
            end = request.getDate().atTime(23, 59, 59);
        } else if (request.getMonth() != null) {
            LocalDate first = LocalDate.of(request.getYear(), request.getMonth(), 1);
            LocalDate last = first.withDayOfMonth(first.lengthOfMonth());
            start = first.atStartOfDay();
            end = last.atTime(23, 59, 59);
        } else if (request.getYear() != null) {
            LocalDate first = LocalDate.of(request.getMonth(), 1, 1);
            LocalDate last = first.withDayOfMonth(first.lengthOfMonth());
            start = first.atStartOfDay();
            end = last.atTime(23, 59, 59);
        } else {
            start = LocalDate.of(2000, 1, 1).atStartOfDay();
            end = LocalDate.now().atTime(23, 59, 59);
        }

        return personResponsity.findAllByCreatedDateBetweenOrderByCreatedDateDesc(start, end).stream()
                .map(p -> new UserReportReponse(
                        p.getPersonId(),
                        p.getName(),
                        p.getDistrict(),
                        p.getEmail(),
                        p.getCity(),
                        p.getPhone(),
                        p.getRolename().toString(),
                        p.getCreatedDate().toLocalDate()
                )).collect(Collectors.toList());
    }

    @Override
    public List<UserFilterRespone> filterUser(UserFilterRequest request) {
        List<Person> person = personResponsity.findAll();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate from = request.getCreatedDateform() != null
                ? LocalDate.parse(request.getCreatedDateform(), formatter)
                : null;

        LocalDate to = request.getCreatedDateTo() != null
                ? LocalDate.parse(request.getCreatedDateTo(), formatter)
                : null;

        List<Person> filtered = person.stream()
                .filter(p -> request.getName() == null || p.getName().toLowerCase().contains(request.getName().toLowerCase()))
                .filter(p -> request.getRolename() == null ||
                        (p.getRolename() != null &&
                                p.getRolename().toString().toLowerCase().contains(request.getRolename())))
                .filter(p -> request.getActive() == null || p.getActive().equals(request.getActive()))
                .filter(p ->from == null || (p.getCreatedDate() != null && !p.getCreatedDate().toLocalDate().isBefore(from)))
                .filter(p -> to == null || (p.getCreatedDate() != null && !p.getCreatedDate().toLocalDate().isAfter(to)))
                .collect(Collectors.toList());

        return filtered.stream()
                .map(p -> new UserFilterRespone(
                        p.getName(),
                        p.getRolename().toString(),
                        p.getActive(),
                        p.getCreatedDate() != null ? p.getCreatedDate().toString() : null
                )).collect(Collectors.toList());
    }


    @Override
    public void updateUser(UserUpdateRequest request) {
        Person person = personResponsity.findById(String.valueOf(request.getPersonId()))
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

        if (request.getActive() != null) {
            person.setActive(request.getActive());
        }

        if (request.getRole() != null) {
            person.setRolename(RoleName.valueOf(request.getRole()));
        }

        personResponsity.save(person);
    }

}
