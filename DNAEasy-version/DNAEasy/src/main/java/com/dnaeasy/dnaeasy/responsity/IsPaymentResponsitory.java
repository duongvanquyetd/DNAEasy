package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IsPaymentResponsitory extends JpaRepository<Payment, Integer> {
}
