package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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

    private String ImageUrl;
    @ManyToMany(mappedBy = "sampleTracking",cascade = CascadeType.ALL)
    private Set<Sample> sample = new HashSet<>();
}
