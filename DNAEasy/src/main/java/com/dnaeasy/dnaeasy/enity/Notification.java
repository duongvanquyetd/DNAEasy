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
    @Column(columnDefinition = "TEXT")
    private String content;
    @Column(nullable = false,columnDefinition = "BIT DEFAULT 0")
    private boolean readed=false;

    private LocalDateTime time;
    @ManyToOne
    @JoinColumn(name="person_Id")
    private Person person;

}
