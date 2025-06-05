package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    @OneToMany(mappedBy = "result", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sample> sampelist = new ArrayList<>();

}
