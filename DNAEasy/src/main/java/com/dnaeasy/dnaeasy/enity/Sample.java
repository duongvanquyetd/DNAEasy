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


    @ManyToMany
    @JoinTable(
            name = "Sample_SampleTracking",
            joinColumns = @JoinColumn(name = "sample_Id"),
            inverseJoinColumns = @JoinColumn(name = "tracking_id")
    )
    private Set<SampleTracking> sampleTracking = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "persontest_Id")
    private PersonTest personTest;
}
