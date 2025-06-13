package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="AppointmentTracking")

public class AppointmnentTracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int statusTrackingid;
    private String StatusName;

    private LocalDateTime StatusDate; //sample // result //appointment
    private String imageUrl;
    @ManyToOne
    @JoinColumn(name="appointment_id")
    private Appointment appointment;

}
