package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Sample")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Sample {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sampleid;

    private String sampleType;//mong tay/mau/ban chai.v.v.v..v
    private String samplecode;
    private String sampleName;
    private String cureStatusSample;
    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;
    @ManyToOne
    @JoinColumn(name = "result_id")
    private Result result;
    @OneToMany(mappedBy = "sample",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SampleTracking> tracks = new ArrayList<>();
}
