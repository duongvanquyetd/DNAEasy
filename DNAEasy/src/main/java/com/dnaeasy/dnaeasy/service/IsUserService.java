package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.*;
import com.dnaeasy.dnaeasy.dto.response.StaffResponse;
import com.dnaeasy.dnaeasy.dto.response.UserFilterRespone;
import com.dnaeasy.dnaeasy.dto.response.UserReportReponse;
import com.dnaeasy.dnaeasy.dto.response.UserResponse;
import com.nimbusds.jose.JOSEException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IsUserService {

    //   Person UserLogin(AuthencationRequest authencationRequest);
//   CustomerResponse CreateUser(UserCreateRequest userCreateRequest);
    String checkUsernameEmailPhone(UserCreateRequest userCreateRequest);

    List<UserResponse> getALlCustomers();
    //CustomerResponse GetCustomerByID(String id);

    UserResponse myInfor();

    String updateUser(UserUpdateResquest userUpdateResques);
    void deleteUser(int id);
    List<UserReportReponse> listUser(PersonRequest request);

    List<UserFilterRespone> filterUser(UserFilterRequest request);

    void updateUser(UserUpdateRequest request);
}
