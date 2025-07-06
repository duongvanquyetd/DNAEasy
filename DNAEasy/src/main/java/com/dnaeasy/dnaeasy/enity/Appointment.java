package com.dnaeasy.dnaeasy.enity;

import com.dnaeasy.dnaeasy.enums.SampleMethod;
import com.dnaeasy.dnaeasy.enums.Work_hour;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Nationalized;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Appoinment")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appointmentId;
    @Nationalized
    @Column(nullable = false)
    private String location;
    private LocalDateTime dateCollect;
    @Column
    @CreationTimestamp
    private LocalDateTime createdate ;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String note;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SampleMethod typeCollect;
    private String curentStatusAppointment;
    @ManyToOne
    @JoinColumn(name = "satff_id")
    private Person staff;
    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;
    @OneToMany(mappedBy = "appointment",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Payment> payment = new ArrayList<>();
    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sample> sampelist = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Person customer;

    @Pattern(
            regexp = "^0(3|5|7|8|9)[0-9]{8}$",
            message = "Phone number is invalid. Must be 10 digits and start with 03, 05, 07, 08, or 09"
    )
    private String phoneAppointment;

    @Email(message = "Email is invalid")
    private String  emailAppointment;
    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AppointmnentTracking> appointmnentTrackings = new ArrayList<>();
}


///