package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// sua lai lop cho phu hop voi mapper service
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "ServiceImage")
public class ServiceImage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long blogId;
    private String BlogImageName;

    private String BlogImagePath;
    @ManyToOne
    @JoinColumn(name="Service_id")
    private Service service;
}