package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "Result")
public class Result {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int resultId;
    private String resulFilePDF;
    private String conclustionResult;
    private String curentStatusResult;
    private LocalDateTime resultTime;
    @ManyToOne
    @JoinColumn(name = "Staff_id")
    private Person staff;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "Sample_Result",
            joinColumns = {@JoinColumn(name ="Result_id")},inverseJoinColumns = @JoinColumn(name = "Sample_Id")
    )
    private Set<Sample> sampelist = new HashSet<>();

}
