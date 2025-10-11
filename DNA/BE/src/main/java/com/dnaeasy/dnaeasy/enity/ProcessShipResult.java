package com.dnaeasy.dnaeasy.enity;

import com.dnaeasy.dnaeasy.enums.RoleName;
import com.dnaeasy.dnaeasy.enums.TypeReciveResult;
import jakarta.persistence.*;
import lombok.Data;

@Table(name = "processShipResult")
@Entity
@Data
public class ProcessShipResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String statusName;
    @Enumerated(EnumType.STRING)
    private RoleName permision;
    @Enumerated(EnumType.STRING)
    private TypeReciveResult type;
    private int orderProcess;

}
