package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IsAppointmentResponsitory extends JpaRepository<Appointment, Integer> {
}
