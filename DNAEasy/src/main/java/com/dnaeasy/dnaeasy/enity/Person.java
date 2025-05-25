package com.dnaeasy.dnaeasy.enity;

import com.dnaeasy.dnaeasy.enums.GenderEnum;
import com.dnaeasy.dnaeasy.enums.RoleName;
import com.dnaeasy.dnaeasy.enums.Work_hour;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int personId;
    @Column(unique = true, nullable = false )
    private String phone;
    @Nationalized
    @Column(nullable = false)
    private String name;
    @NotBlank(message = "password not empty")

    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GenderEnum gender;
    @Enumerated(EnumType.STRING)
    private Work_hour work_hour;
    @Nationalized
    @Column(nullable = false)
    private String streets;
    @Nationalized
    @Column(nullable = false)
    private String city;
    @Nationalized
    @Column(nullable = false)
    private String district;
    @Enumerated(EnumType.STRING)
    private RoleName rolename;
//    @Lob
//    private byte[] avatar;
    private String avatarUrl;
    @Column(nullable = false,unique = true)
    private String username;
    @Column(nullable = false,unique = true)
    private String email;
    //@ManyToOne


//    @JoinColumn(name="department_id")
//    private Department department;

    @OneToMany(mappedBy = "staff",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Result> results = new ArrayList<>();
    @OneToMany(mappedBy = "staff",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Blog> blogList = new ArrayList<>();
     @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL, orphanRemoval = true)
     private  List<Comment> commentList = new ArrayList<>();
     @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL, orphanRemoval = true)
    private  List<Appointment> appointmentList = new ArrayList<>();

     @OneToOne(mappedBy = "staff")
    private Appointment appointment;
}
