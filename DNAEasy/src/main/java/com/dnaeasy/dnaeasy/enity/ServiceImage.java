package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "ServiceImage")
public class ServiceImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceImageId;
    private String serviceImageName;
    @Lob
    private String serviceImagePath;
    @ManyToOne
    @JoinColumn(name="Service_id")
    private Service service;
}
