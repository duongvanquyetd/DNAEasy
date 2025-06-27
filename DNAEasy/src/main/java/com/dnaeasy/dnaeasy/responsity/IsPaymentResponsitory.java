package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.Payment;
import com.dnaeasy.dnaeasy.enums.PaymentMehtod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

import java.util.Collection;

import java.time.LocalDateTime;

import java.util.List;

public interface IsPaymentResponsitory extends JpaRepository<Payment, Integer> {

    Payment getPaymentByAppointment_AppointmentId(int appointmentAppointmentId);
@Query("Select p from Payment  p where p.paycode =:a")
    Payment findAllByVnpay_codeEqualsIgnoreCase(String a);

    Payment findByAppointment(Appointment appointment);

    Payment findByAppointment_AppointmentId(int appointmentAppointmentId);

    @Query(value = """
    select sum(p.payment_amount) from payment p join  appoinment a on a.appointment_id = p.apppointment_id
    where p.payment_status = 1 and is_expense = 0 and  a.curent_status_appointment = 'COMPLETED'
    and p.pay_date between :startDate and :endDate
    """, nativeQuery = true)
    BigDecimal getTodayRevenueToday(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    @Query("SELECT SUM(p.paymentAmount) FROM Payment p WHERE p.isExpense = true AND p.paymentDate BETWEEN :start AND :end")
    BigDecimal getTotalExpense(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);


   @Query("select p from Payment p where p.isExpense = false and p.appointment.appointmentId =:appointmentid")
    Payment findByAppointmentIdAndExpenseIsFalse(int appointmentid);

    @Query("select p from Payment p where p.paymentStatus = false and p.isExpense = false and p.appointment.curentStatusAppointment  in (:appointmentCurentStatusAppointments)")
    List<Payment> findAllByPaymentStatusIsFalseAndExpenseIsFalseAndAppointment_CurentStatusAppointmentIsIn( Collection<String> appointmentCurentStatusAppointments);

    List<Payment> findAllByPaymentStatusIsTrueAndPaymentDateIsBetween(LocalDateTime start, LocalDateTime end);

    List<Payment> findALLByPaycode(String paycode);
}
