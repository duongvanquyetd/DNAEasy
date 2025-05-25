package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="StatusTracking")
public class AppointmnentTracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int statusTrackingid;
    private String StatusName;

    private LocalDateTime StatusDate; //sample // result //appointment
    @ManyToOne
    @JoinColumn(name="appointment_id")
    private Appointment appointment;
//    @ManyToOne
//    @JoinColumn(name="result_id")
//    private Result result;
//    @ManyToOne
//    @JoinColumn(name="sample_id")
//    private Sample sample;
}
