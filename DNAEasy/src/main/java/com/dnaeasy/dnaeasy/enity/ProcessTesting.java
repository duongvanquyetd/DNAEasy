package com.dnaeasy.dnaeasy.enity;

import com.dnaeasy.dnaeasy.enums.RoleName;
import com.dnaeasy.dnaeasy.enums.SampleMethod;
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
    @Enumerated(EnumType.STRING)

    private SampleMethod sampleMethod;
    private String  statusName;
    private int orderProcess;
    private boolean isFinished;
    private String formfor;
    @Enumerated(EnumType.STRING)
    private RoleName person_confirm;



}
