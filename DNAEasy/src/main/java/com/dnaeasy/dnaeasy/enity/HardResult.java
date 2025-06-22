package com.dnaeasy.dnaeasy.enity;

import com.dnaeasy.dnaeasy.enums.TypeReciveResult;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Table(name="HardResult")
@Entity
@Data
public class HardResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String address;
    @Pattern(
            regexp = "^0(3|5|7|8|9)[0-9]{8}$",
            message = "Phone number is invalid. Must be 10 digits and start with 03, 05, 07, 08, or 09"
    )
    private String phone;
    @Enumerated(EnumType.STRING)
    private TypeReciveResult type;
    private String curentStatus;

    @OneToMany(mappedBy = "hardresult",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Result> listResult = new ArrayList<>();

    @OneToMany(mappedBy = "hardresult",cascade = CascadeType.ALL,orphanRemoval = true)
    private  List<HardResultTracking> listTracking = new ArrayList<>();
}
