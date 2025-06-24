package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name="PersonTest")
public class PersonTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @NotBlank( message = "Name Not empty")
    public String name;

    @Pattern(regexp = "^0(0[1-9]|[1-8][0-9]|9[0-6])\\d{9}$" ,message ="CCCD must be star 001-096 and have  12 digits" )
    public String CCCD;

    public String relationName;
    @OneToOne(mappedBy = "personTest")
    public Sample sample;
}
