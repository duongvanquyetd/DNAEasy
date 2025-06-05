package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name="PersonTest")
public class PersonTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String name;
    public String CCCD;
    public String relationName;
    @OneToOne(mappedBy = "personTest")
    public Sample sample;
}
