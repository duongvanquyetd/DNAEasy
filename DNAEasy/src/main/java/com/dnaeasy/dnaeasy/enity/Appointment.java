package com.dnaeasy.dnaeasy.enity;

import com.dnaeasy.dnaeasy.enums.SampleMethod;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private String location;
    private LocalDateTime dateCollect;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String note;
    @Enumerated(EnumType.STRING)
    private SampleMethod typeCollect;
    private String curentStatusAppointment;
    @ManyToOne
    @JoinColumn(name="satff_id")
    private Person staff;
    @ManyToOne
    @JoinColumn(name ="service_id")
    private Service service ;
    @OneToOne(mappedBy = "appointment")
    private Payment payment;
    @OneToMany(mappedBy = "appointment",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sample> sampelist = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name="customer_id")
    private Person customer;

    @OneToMany(mappedBy = "appointment",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AppointmnentTracking> appointmnentTrackings = new ArrayList<>();
}
