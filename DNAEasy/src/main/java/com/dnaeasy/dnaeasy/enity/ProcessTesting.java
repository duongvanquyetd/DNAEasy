package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ProcessTesting")
public class ProcessTesting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int  procssTestingId;
    private String  sampleMethod;
    private String  statusName;
    private int orderProcess;
    private boolean isFinished;



}
