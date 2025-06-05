package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name="Notification")
@Getter
@Setter
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notiID;
    private String conten;
    private LocalDateTime time;
    @ManyToOne
    @JoinColumn(name="person_Id")
    private Person person;
    @ManyToOne
    @JoinColumn(name="staff_id")
    private Person staff;
}
