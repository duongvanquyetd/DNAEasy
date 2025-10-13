package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;

@Table(name ="System_Config")
@Entity
@Data
public class SystemConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String value;
}
