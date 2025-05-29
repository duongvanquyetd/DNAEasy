package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;
    private String paymentMethod;
    private boolean paymentStatus;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String contenPayment;
    @Column(precision = 19, scale = 2)
    private BigDecimal paymentAmount;
    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn(name="apppointment_id")
    private Appointment appointment;

}
