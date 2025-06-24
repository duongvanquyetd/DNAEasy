package com.dnaeasy.dnaeasy.enity;

import com.dnaeasy.dnaeasy.enums.PaymentMehtod;
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
    @Enumerated(EnumType.STRING)
    private PaymentMehtod paymentMethod;
    private boolean paymentStatus;
    private boolean isExpense;
    private String paycode;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String contenPayment;
    @Column(precision = 19, scale = 2)
    private BigDecimal paymentAmount;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="apppointment_id")
    private Appointment appointment;
    @ManyToOne
    @JoinColumn(name = "Staff_receptionID")
    private Person staffReception;
    @Column(name = "pay_date")
    private LocalDateTime paymentDate;
}
