package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @Column(unique = true)
    private String samplecode;

    private String cureStatusSample;
    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;
    @ManyToMany(mappedBy = "sampelist")
    private Set<Result> result = new HashSet<>();


    @OneToMany(mappedBy = "sample",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SampleTracking> tracks = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "persontest_Id")
    private PersonTest personTest;
}
