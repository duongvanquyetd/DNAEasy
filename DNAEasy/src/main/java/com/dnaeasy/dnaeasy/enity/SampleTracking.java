package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "SampleTracking")
public class SampleTracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sampleTrackingId;
    private String StatusName;

    private LocalDateTime StatusDate; //sample // result //appointment
    @ManyToOne
    @JoinColumn(name="sample_id")
    private Sample sample;
}
