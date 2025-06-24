package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.dto.response.TopServiceReponse;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.Payment;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.enity.Sample;
import com.dnaeasy.dnaeasy.enums.PaymentMehtod;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface IsAppointmentResponsitory extends JpaRepository<Appointment, Integer> {

    List<Appointment> findAllByStaffAndCurentStatusAppointmentNotIn(Person staff, Collection<String> curentStatusAppointments);

    List<Appointment> findAllByCustomerAndCurentStatusAppointmentNotIn(Person customer, Collection<String> curentStatusAppointments);

    @Query("Select a.appointment.appointmentId from Sample a where a.sampleid =:id  ")
    int getAppointmentIDBySampleID(int id);

    List<Appointment> findAllByCurentStatusAppointmentNotIn(Collection<String> curentStatusAppointments);


    List<Appointment> findAllByStaffAndCurentStatusAppointmentIsIn(Person staff, Collection<String> curentStatusAppointments);

    List<Appointment> findAllByCustomerAndCurentStatusAppointmentIsIn(Person customer, Collection<String> curentStatusAppointments);


    List<Appointment> findALLByPayment_StaffReceptionAndCurentStatusAppointmentIsIn(Person paymentStaffReception, Collection<String> curentStatusAppointments);

    boolean existsByCustomer_PersonIdAndService_ServiceIdAndCurentStatusAppointmentIsIn(int customerPersonId, int serviceServiceId, Collection<String> curentStatusAppointments);

    @Query("select count(a) from Appointment a where a.dateCollect between :start and :end and a.curentStatusAppointment='COMPLETED'")

    int countCompletedAppointmentsToday(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query(value = """
        select top 10 s.service_name as name, count (a.appointment_id) as total
        from appoinment a join service s on a.service_id = s.service_id
        where a.curent_status_appointment = 'COMPLETED' 
        AND a.date_collect BETWEEN :start AND :end
        group by s.service_name order by total DESC
    """, nativeQuery = true)
    List<TopServiceReponse> findTop10Service(@Param("start") Timestamp start,
                                             @Param("end") Timestamp end);

    List<Appointment> findAllByCurentStatusAppointmentAndDateCollectIsBetween(String status,LocalDateTime start,LocalDateTime end);

    List<Appointment> findAllByCurentStatusAppointmentAndDateCollectBetween(
            String currentStatusAppointment,
            LocalDateTime start,
            LocalDateTime end
    );

    int countByService_ServiceIdAndCustomer_PersonIdAndCurentStatusAppointmentIsIn(int serviceServiceId, int customerPersonId, Collection<String> curentStatusAppointments);


    @Query("""
    SELECT a 
    FROM Appointment a 
    WHERE 
        (
            SIZE(a.sampelist) = 0 
            OR a.staff IS NULL 
            OR a.appointmentId IN (
                SELECT s.appointment.appointmentId 
                FROM Sample s 
                WHERE s.cureStatusSample IS NULL
            )
        )
        AND a.curentStatusAppointment NOT IN ('CANCLE', 'COMPLETE', 'REFUNDED')
        order by a.dateCollect desc 
""")
    Page<Appointment> findForMangerAssign(Pageable pageable);


}
