package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.dto.response.TopServiceReponse;
import com.dnaeasy.dnaeasy.enity.*;
import com.dnaeasy.dnaeasy.enums.PaymentMehtod;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface IsAppointmentResponsitory extends JpaRepository<Appointment, Integer> {


    @Query("""
            select  a from Appointment  a where a.staff=:staff 
            and (
            lower(a.location) like lower(concat('%',:keysearch,'%')) 
            or :keysearch is null 
            or lower(a.curentStatusAppointment) like lower(concat('%',:keysearch,'%') ) 
            or lower(a.typeCollect) like lower(concat('%',:keysearch,'%'))  
            or lower(a.service.serviceName) like  lower(concat('%',:keysearch,'%'))  
            or lower(a.emailAppointment) like lower(concat('%',:keysearch,'%')) 
            or lower(a.phoneAppointment) like lower(concat('%',:keysearch,'%'))    
             )
            and a.curentStatusAppointment not in (:list) 
            
            
            """)
    List<Appointment> findAllByStaffAndCurentStatusAppointmentNotIn(Person staff, Collection<String> list, String keysearch);


    @Query("""
            select  a from Appointment  a where a.customer=:customer
            and (
            lower(a.location) like lower(concat('%',:keysearch,'%')) 
            or :keysearch is null 
            or lower(a.curentStatusAppointment) like lower(concat('%',:keysearch,'%') ) 
            or lower(a.typeCollect) like lower(concat('%',:keysearch,'%'))  
            or lower(a.service.serviceName) like  lower(concat('%',:keysearch,'%'))  
            or lower(a.emailAppointment) like lower(concat('%',:keysearch,'%')) 
            or lower(a.phoneAppointment) like lower(concat('%',:keysearch,'%'))    
            or lower(a.customer.name) like lower(concat('%',:keysearch,'%'))    
             )
            and a.curentStatusAppointment not in (:list) 
            
            """)
    Page<Appointment> findAllByCustomerAndCurentStatusAppointmentNotIn(Person customer, Collection<String> list, String keysearch, Pageable pageable);

    @Query("Select a.appointment.appointmentId from Sample a where a.sampleid =:id  ")
    int getAppointmentIDBySampleID(int id);


    @Query("""
            select  a from Appointment  a where
             (
            lower(a.location) like lower(concat('%',:keysearch,'%')) 
            or :keysearch is null 
            or lower(a.curentStatusAppointment) like lower(concat('%',:keysearch,'%') ) 
            or lower(a.typeCollect) like lower(concat('%',:keysearch,'%'))  
            or lower(a.service.serviceName) like  lower(concat('%',:keysearch,'%'))  
            or lower(a.emailAppointment) like lower(concat('%',:keysearch,'%')) 
            or lower(a.phoneAppointment) like lower(concat('%',:keysearch,'%'))    
            or lower(a.customer.name) like lower(concat('%',:keysearch,'%')) 
             )
            and a.curentStatusAppointment not in (:list) 
            
            """)
    List<Appointment> findAllByCurentStatusAppointmentNotIn(Collection<String> list, String keysearch);


    @Query("""
            select  a from Appointment  a where a.staff=:staff 
            and (
            lower(a.location) like lower(concat('%',:keysearch,'%')) 
            or :keysearch is null 
            or lower(a.curentStatusAppointment) like lower(concat('%',:keysearch,'%') ) 
            or lower(a.typeCollect) like lower(concat('%',:keysearch,'%'))  
            or lower(a.service.serviceName) like  lower(concat('%',:keysearch,'%'))  
            or lower(a.emailAppointment) like lower(concat('%',:keysearch,'%')) 
            or lower(a.phoneAppointment) like lower(concat('%',:keysearch,'%'))    
            or lower(a.customer.name) like lower(concat('%',:keysearch,'%')) 
             )
            and a.curentStatusAppointment  in (:list) 
            
            """)
    Page<Appointment> findAllByStaffAndCurentStatusAppointmentIsIn(Person staff, Collection<String> list, String keysearch, Pageable pageable);


    @Query("""
            select  a from Appointment  a where a.customer=:customer
            and (
            lower(a.location) like lower(concat('%',:keysearch,'%')) 
            or :keysearch is null 
            or lower(a.curentStatusAppointment) like lower(concat('%',:keysearch,'%') ) 
            or lower(a.typeCollect) like lower(concat('%',:keysearch,'%'))  
            or lower(a.service.serviceName) like  lower(concat('%',:keysearch,'%'))  
            or lower(a.emailAppointment) like lower(concat('%',:keysearch,'%')) 
            or lower(a.phoneAppointment) like lower(concat('%',:keysearch,'%'))  
            or lower(a.customer.name) like lower(concat('%',:keysearch,'%'))   
             )
            and a.curentStatusAppointment  in (:list) 
            
            """)
    Page<Appointment> findAllByCustomerAndCurentStatusAppointmentIsIn(Person customer, Collection<String> list, String keysearch, Pageable pageable);


    @Query("""
            select  a from Appointment  a where
             (
            lower(a.location) like lower(concat('%',:keysearch,'%')) 
            or :keysearch is null 
            or lower(a.curentStatusAppointment) like lower(concat('%',:keysearch,'%') ) 
            or lower(a.typeCollect) like lower(concat('%',:keysearch,'%'))  
            or lower(a.service.serviceName) like  lower(concat('%',:keysearch,'%'))  
            or lower(a.emailAppointment) like lower(concat('%',:keysearch,'%')) 
            or lower(a.phoneAppointment) like lower(concat('%',:keysearch,'%'))   
            or lower(a.customer.name) like lower(concat('%',:keysearch,'%'))  
             )
            and a.curentStatusAppointment  in (:list) 
            and a.appointmentId in (Select p.appointment.appointmentId from Payment p where p.staffReception =:staff)
            
            """)
    Page<Appointment> findALLByPayment_StaffReceptionAndCurentStatusAppointmentIsIn(Person staff, Collection<String> list, String keysearch, Pageable pageable);

    boolean existsByCustomer_PersonIdAndService_ServiceIdAndCurentStatusAppointmentIsIn(int customerPersonId, int serviceServiceId, Collection<String> curentStatusAppointments);

    @Query("select count(a) from Appointment a where a.dateCollect between :start and :end and a.curentStatusAppointment='COMPLETED'")
    int countCompletedAppointmentsToday(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query(value = """

        select top 10 s.service_name as name, count (a.appointment_id) as total
        from appoinment a join service s on a.service_id = s.service_id
        where a.curent_status_appointment = 'COMPLETED' 
        group by s.service_name order by total DESC
    """, nativeQuery = true)
    List<TopServiceReponse> findTop10Service();


//    AND a.date_collect BETWEEN :startDate AND :endDate

    List<Appointment> findAllByCurentStatusAppointmentAndDateCollectIsBetween(String status, LocalDateTime start, LocalDateTime end);

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
                    AND a.curentStatusAppointment NOT IN ('CANCLE', 'COMPLETE', 'REFUNDED','WAITING FOR PAYMENT')
                    order by a.dateCollect desc 
            """)
    Page<Appointment> findForMangerAssign(Pageable pageable);


    @Query("""
            select  a from Appointment  a where 
             (
            lower(a.location) like lower(concat('%',:keysearch,'%')) 
            or :keysearch is null 
            or lower(a.curentStatusAppointment) like lower(concat('%',:keysearch,'%') ) 
            or lower(a.typeCollect) like lower(concat('%',:keysearch,'%'))  
            or lower(a.service.serviceName) like  lower(concat('%',:keysearch,'%'))  
            or lower(a.emailAppointment) like lower(concat('%',:keysearch,'%')) 
            or lower(a.phoneAppointment) like lower(concat('%',:keysearch,'%'))
            or lower(a.customer.name) like lower(concat('%',:keysearch,'%'))     
             )
            and a.appointmentId in (select s.appointment.appointmentId  from Sample  s where s.sampleid in (:sampleid))
            """)
    Page<Appointment> findByStaffLabAndCurrentAppointmnetIsIn(List<Integer> sampleid, String keysearch, Pageable pageable);


    @Query("""
            select  a from Appointment  a where 
             (
            lower(a.location) like lower(concat('%',:keysearch,'%')) 
            or :keysearch is null 
            or lower(a.curentStatusAppointment) like lower(concat('%',:keysearch,'%') ) 
            or lower(a.typeCollect) like lower(concat('%',:keysearch,'%'))  
            or lower(a.service.serviceName) like  lower(concat('%',:keysearch,'%'))  
            or lower(a.emailAppointment) like lower(concat('%',:keysearch,'%')) 
            or lower(a.phoneAppointment) like lower(concat('%',:keysearch,'%'))    
            or lower(a.customer.name) like lower(concat('%',:keysearch,'%')) 
             )
            and a.curentStatusAppointment  in (:list) 
            and a.appointmentId in (select p.appointment.appointmentId from Payment p where p.paymentStatus = false and p.isExpense = false)
            """)

    List<Appointment>findAllByPaymentStatusIsFalseAndExpenseIsFalseAndAppointment_CurentStatusAppointmentIsIn(String keysearch,List<String> list);

    @Query("select count(a) from Appointment a")
    int countAllAppointments();
    
    @Query("select count(a) from Appointment a where a.curentStatusAppointment = 'COMPLETED'")
    int countCompletedAppointments();
    
    @Query("select count(a) from Appointment a where a.curentStatusAppointment not in ('COMPLETED', 'CANCLE', 'REFUNDED')")
    int countInProgressAppointments();
    
    @Query("select count(a) from Appointment a where a.curentStatusAppointment = 'CANCLE'")
    int countCancelledAppointments();
    
    @Query("select count(a) from Appointment a where a.curentStatusAppointment = 'REFUNDED'")
    int countRefundedAppointments();

//    List<Appointment> findAllByPaymentStatusIsFalseAndExpenseIsFalseAndAppointment_CurentStatusAppointmentIsIn(String keysearch, List<String> list);

    List<Appointment> findALLByCurentStatusAppointmentIn(Collection<String> curentStatusAppointments);

    @Query("""
            select  a from Appointment  a where 
             (
            lower(a.location) like lower(concat('%',:keysearch,'%')) 
            or :keysearch is null 
            or lower(a.curentStatusAppointment) like lower(concat('%',:keysearch,'%') ) 
            or lower(a.typeCollect) like lower(concat('%',:keysearch,'%'))  
            or lower(a.service.serviceName) like  lower(concat('%',:keysearch,'%'))  
            or lower(a.emailAppointment) like lower(concat('%',:keysearch,'%')) 
            or lower(a.phoneAppointment) like lower(concat('%',:keysearch,'%'))    
           or lower(a.customer.name) like lower(concat('%',:keysearch,'%'))   
             )
            and a.curentStatusAppointment  in ('COMPLETE') 
            and a.customer.personId in (select c.customer.personId from Comment  c)
            """)
    List<Appointment> findALLAppointmentHaveCommnent(String keysearch);

    int countByStaff(Person staff);



@Query("""
        select  a from Appointment  a where
        a.createdate between :fromdate and :todate
        
""")
    List<Appointment> findAllByDateCollect(LocalDateTime fromdate,LocalDateTime todate);


    @Query("""
        select  count(*) from Appointment  a where
        a.createdate between :star and :end
        and a.curentStatusAppointment = :list
""")
    Long countByDateCollectAndCurentStatusAppointmentIsLike(LocalDateTime star , LocalDateTime end, String list);

    @Query("""
        select   count(*)  from Appointment  a where
        a.createdate between :star and :end
        and a.curentStatusAppointment not in (:list)
""")
    Long countAppointmentInprocess(LocalDateTime star , LocalDateTime end, List<String> list);


    @Query("""
        select  a from Appointment  a where
        a.createdate between :start and :end
        and (:status is null  or a.curentStatusAppointment =:status)
""")
    Page<Appointment> getAppointmentsByCreatedateAndCurentStatusAppointmentIsIn(LocalDateTime start,LocalDateTime end, String status,Pageable pageable);
    @Query("""
        select a  from Appointment  a 
        order by 
        a.createdate  desc
""")
    List<Appointment>findTop10(Pageable pageable);
}
