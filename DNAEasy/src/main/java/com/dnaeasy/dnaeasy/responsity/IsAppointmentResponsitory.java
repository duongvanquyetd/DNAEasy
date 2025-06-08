package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.enity.Sample;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;

public interface IsAppointmentResponsitory extends JpaRepository<Appointment, Integer> {
    List<Appointment> findAllByStaff(Person staff);

    List<Appointment> findAllByCustomer(Person customer);

    List<Appointment> findAllByStaffAndCurentStatusAppointment(Person staff, String curentStatusAppointment);

    List<Appointment> findAllByStaffAndCurentStatusAppointmentNotIn(Person staff, Collection<String> curentStatusAppointments);

    List<Appointment> findAllByCustomerAndCurentStatusAppointmentNotIn(Person customer, Collection<String> curentStatusAppointments);

@Query("Select a.appointment.appointmentId from Sample a where a.sampleid =:id  ")
    int  getAppointmentIDBySampleID(int id);

    List<Appointment> findAllByCurentStatusAppointmentNotIn(Collection<String> curentStatusAppointments);

    Appointment findBySampelist(List<Sample> sampelist);


    List<Appointment> findAllByStaffAndCurentStatusAppointmentIsIn(Person staff, Collection<String> curentStatusAppointments);

    List<Appointment> findAllByCustomerAndCurentStatusAppointmentIsIn(Person customer, Collection<String> curentStatusAppointments);
}
