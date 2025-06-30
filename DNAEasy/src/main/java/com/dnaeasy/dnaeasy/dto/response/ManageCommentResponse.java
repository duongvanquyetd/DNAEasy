package com.dnaeasy.dnaeasy.dto.response;

import com.dnaeasy.dnaeasy.enums.SampleMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ManageCommentResponse {
    private String commentContent;
    private int rating;
    private LocalDateTime commentDate;
    private String phoneCustomer;
    private String emailCustomer;
    private String nameCustomer;
    private String avatarUrlStaff_Lab;
    private String phoneStaff_Lab;
    private String emailStaff_Lab;
    private String nameStaff_Lab;
    private String avatarUrlStaff_Test;
    private String phoneStaff_Test;
    private String emailStaff_Test;
    private String nameStaff_Test;
    private String avatarUrlStaff_Reception;
    private String phoneStaff_Reception;
    private String emailStaff_Reception;
    private String nameStaff_Reception;
    private String avatarUrlStaff_ReceptionRefund;
    private String phoneStaff_Reception_Refund;
    private String emailStaff_Reception_Refund;
    private String nameStaff_Reception_Refund;
    private String serviceName;
    private String serviceType;
    private LocalDateTime dateCollected;
    private SampleMethod typeCollect;
    private String avatarUrl_Customer;



}
