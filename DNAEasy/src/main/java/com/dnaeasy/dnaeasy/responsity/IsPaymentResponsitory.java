package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IsPaymentResponsitory extends JpaRepository<Payment, Integer> {

    Payment getPaymentByAppointment_AppointmentId(int appointmentAppointmentId);
@Query("Select p from Payment  p where p.vnpay_code =:a")
    Payment findAllByVnpay_codeEqualsIgnoreCase(String a);

    Payment findByAppointment(Appointment appointment);

    Payment findByAppointment_AppointmentId(int appointmentAppointmentId);
}
