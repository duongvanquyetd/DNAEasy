package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface IsPaymentResponsitory extends JpaRepository<Payment, Integer> {

    Payment getPaymentByAppointment_AppointmentId(int appointmentAppointmentId);
@Query("Select p from Payment  p where p.vnpay_code =:a")
    Payment findAllByVnpay_codeEqualsIgnoreCase(String a);

    Payment findByAppointment(Appointment appointment);

    Payment findByAppointment_AppointmentId(int appointmentAppointmentId);

    @Query(value = """
    select sum(p.payment_amount) from payment p join  appoinment a on a.appointment_id = p.apppointment_id
    where p.payment_status = 1 and a.curent_status_appointment = 'COMPLETED'
    AND CAST(p.pay_date AS DATE) = CAST(GETDATE() AS DATE)""",
            nativeQuery = true)

    BigDecimal getTodayRevenueToday();
//    @Query(value = """
// SELECT SUM(p.payment_amount)
//    FROM payment p
//    JOIN appoinment a ON a.appoinmentId = p.appoinmentId
//    WHERE p.payment_status = 1
//      AND a.curent_status_appointment = 'COMPLETED'
//      AND CAST(p.pay_date AS DATE) = CAST(GETDATE() AS DATE)
//    """, nativeQuery = true)
}
