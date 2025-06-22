package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.Payment;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.enity.Sample;
import com.dnaeasy.dnaeasy.enums.PaymentMehtod;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface IsAppointmentResponsitory extends JpaRepository<Appointment, Integer> {
    List<Appointment> findAllByStaff(Person staff);

    List<Appointment> findAllByCustomer(Person customer);

    List<Appointment> findAllByStaffAndCurentStatusAppointment(Person staff, String curentStatusAppointment);

    List<Appointment> findAllByStaffAndCurentStatusAppointmentNotIn(Person staff, Collection<String> curentStatusAppointments);

    List<Appointment> findAllByCustomerAndCurentStatusAppointmentNotIn(Person customer, Collection<String> curentStatusAppointments);

    @Query("Select a.appointment.appointmentId from Sample a where a.sampleid =:id  ")
    int getAppointmentIDBySampleID(int id);

    List<Appointment> findAllByCurentStatusAppointmentNotIn(Collection<String> curentStatusAppointments);

    Appointment findBySampelist(List<Sample> sampelist);

    List<Appointment> findAllByStaffAndCurentStatusAppointmentIsIn(Person staff, Collection<String> curentStatusAppointments);

    List<Appointment> findAllByCustomerAndCurentStatusAppointmentIsIn(Person customer, Collection<String> curentStatusAppointments);

    List<Appointment> findAllBySampelist(List<Sample> sampelist);

    List<Appointment> findALLByPayment_PaymentMethod(PaymentMehtod paymentPaymentMethod);

    List<Appointment> findALLByPayment_PaymentMethodAndCurentStatusAppointment(PaymentMehtod paymentPaymentMethod, String curentStatusAppointment);

    List<Appointment> findALLByPayment_StaffReceptionAndCurentStatusAppointmentIsIn(Person paymentStaffReception, Collection<String> curentStatusAppointments);

    List<Appointment> findALlByPayment(Payment payment);

    List<Appointment> findALlByPayment_StaffReception(Person paymentStaffReception);

    List<Appointment> findALByCurentStatusAppointmentIsIn(Collection<String> curentStatusAppointments);

    List<Appointment> findALByPayment_PaymentStatusAndCurentStatusAppointmentIsIn(boolean paymentPaymentStatus, Collection<String> curentStatusAppointments);

    boolean existsByCustomer_PersonIdAndService_ServiceId(Integer customerId, Integer serviceId);

    boolean existsByCustomer_PersonIdAndService_ServiceIdAndCurentStatusAppointmentIsIn(int customerPersonId, int serviceServiceId, Collection<String> curentStatusAppointments);


    int countByService_ServiceIdAndCustomer_PersonId(int serviceServiceId, int customerPersonId);

    @Query("select count(a) from Appointment a where a.dateCollect between :start and :end and a.curentStatusAppointment='COMPLETED'")
    int countCompletedAppointmentsToday(@Param("start") LocalDateTime start,
                                         @Param("end") LocalDateTime end);

    List<Appointment> findAllByCurentStatusAppointmentAndDateCollectIsBetween(String status,LocalDateTime start,LocalDateTime end);
    @Query("select  a from Appointment  a where a.staff is null")
    List<Appointment> findAllByStaffIsNull();


    int countByService_ServiceIdAndCustomer_PersonIdAndCurentStatusAppointmentNotIn(int serviceServiceId, int customerPersonId, Collection<String> curentStatusAppointments);

    int countByService_ServiceIdAndCustomer_PersonIdAndCurentStatusAppointmentIsIn(int serviceServiceId, int customerPersonId, Collection<String> curentStatusAppointments);

    List<Appointment> findALLByPayment_PaymentMethodAndCurentStatusAppointmentIsIn(PaymentMehtod paymentPaymentMethod, Collection<String> curentStatusAppointments);
}
