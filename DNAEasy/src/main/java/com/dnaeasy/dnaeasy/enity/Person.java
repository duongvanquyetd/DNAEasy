package com.dnaeasy.dnaeasy.enity;

import com.dnaeasy.dnaeasy.enums.GenderEnum;
import com.dnaeasy.dnaeasy.enums.RoleName;
import com.dnaeasy.dnaeasy.enums.Work_hour;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Nationalized;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int personId;
//    @Column(unique = true, nullable = false)
//    @Pattern(
//            regexp = "^0(3|5|7|8|9)[0-9]{8}$",
//            message = "Phone number is invalid. Must be 10 digits and start with 03, 05, 07, 08, or 09"
//    )  => check tren FE khi dangki vi khi dang nhap gg ko co truong phone neu de nhu nay thi dang ki vao no se loi
    private String phone;
    @Nationalized
    @Column(nullable = false)
    private String name;

//    @Pattern(regexp = "^(?=.*[A-Za-z]).{6,16}$",message = "Password must be 6-16 characters and contain at least one letter")
    private String password;
    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
    private GenderEnum gender;
    @Enumerated(EnumType.STRING)
    private Work_hour work_hour;
    @Nationalized
    private String streets;
    @Nationalized
    private String city;
    @Nationalized

    private String district;
    @Enumerated(EnumType.STRING)
    private RoleName rolename;
    private String typeLogin;
    private String avatarUrl;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false, unique = true)
    @Email(message = "Email is invalid")
    private String email;
    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Result> results = new ArrayList<>();
    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Blog> blogList = new ArrayList<>();
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> commentList = new ArrayList<>();
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Appointment> appointmentList = new ArrayList<>();

    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Appointment> appointmentstaff = new ArrayList<>();

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notificationList = new ArrayList<>();
    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notifications = new ArrayList<>();
    @OneToMany(mappedBy = "staffReception")
    private List<Payment> paymentList = new ArrayList<>();

    @Column(name = "created_date")
    @CreationTimestamp
    private LocalDateTime createdDate;

}