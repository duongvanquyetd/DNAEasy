package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Table
@Entity
@Data
public class HardResultTracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String StatusName;
    private LocalDateTime trackingdate;
    private String imgUrl;
    @ManyToOne
    @JoinColumn(name = "hardresult_id")
    private HardResult hardresult;

}
