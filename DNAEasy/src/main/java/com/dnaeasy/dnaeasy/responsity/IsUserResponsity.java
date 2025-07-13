package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.enums.RoleName;
import com.dnaeasy.dnaeasy.enums.Work_hour;
import jakarta.transaction.Transactional;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface IsUserResponsity extends JpaRepository<Person, String> {
    @Query("SELECT p FROM Person p WHERE p.username = :username AND p.password = :password")
    public Person findByUsernameAndPassword(
            @Param("username") String username,
            @Param("password") String password
    );

    @Query("SELECT MAX(p.personId) FROM Person p ")
    String findMaxPersonId();

    @Query("SELECT p.username FROM Person p WHERE p.username =:username")
    String ExistUserName(String username);

    @Query("SELECT p.phone FROM Person p WHERE p.phone =:phone")
    String ExistedPhone(String phone);


    @Query("SELECT p.email FROM Person p WHERE p.email =:Email")
    String ExistedEmail(String Email);

    Person findByUsername(String username);

    @Query("Select p.name from Person p where  p.personId = :personId ")
    String findNameByPersonId(int personId);

    boolean findByNameBetween(String nameAfter, String nameBefore);

    @Query("Select count(*) from Person p where  p.email = :email ")
    int findByEmail(String email);
    @Query("Select count(*) from Person p where  p.phone = :phone ")
    int findByPhone(String phone);

    Person  findByPersonId(int personId);


    @Query("Select  p from Person p where p.rolename = 'STAFF_TEST' and p.work_hour =:workHour and p.personId not in (Select a.staff.personId from Appointment a where (a.dateCollect between :starday and :endday) and a.curentStatusAppointment not in ('COMPLETE','CANCLE','REFUNDED') and a.staff.work_hour  =:workHour   )and p.active = true")
    Page<Person> findStaffByWorkHour(LocalDateTime starday , LocalDateTime endday, Work_hour workHour, Pageable pageable) ;
    @Query("Select  p from Person p where p.rolename = 'STAFF_TEST' " +
            "and p.work_hour =:workHour " +
            "and p.personId not in (Select a.staff.personId from Appointment a where (a.dateCollect between :starday and :endday) " +
            "and a.curentStatusAppointment not in ('COMPLETE','CANCLE','REFUNDED') " +
            "and a.staff.work_hour  =:workHour ) " +
            "and (lower(p.name) like lower( concat('%',:keyword,'%')) or lower(concat(p.streets,',',p.district,',',p.city ) ) like lower( concat('%',:keyword,'%')) )" +
            "and p.active = true ")

    Page<Person> findStaffByWorkHourWithKeyWord(LocalDateTime starday , LocalDateTime endday, Work_hour workHour, Pageable pageable,String keyword) ;

   

    List<Person> findAllByCreatedDateBetweenOrderByCreatedDateDesc(LocalDateTime start, LocalDateTime end);


    List<Person> findAllByNameContainingAndRolenameAndActive(String name, String rolename, Boolean active);

    @Query("""
    SELECT p FROM Person p
    WHERE (:name IS NULL OR p.name LIKE %:name%)
      AND (:rolename IS NULL OR p.rolename = :rolename)
      AND (:active IS NULL OR p.active = :active)
      AND (:createdDateFrom IS NULL OR p.createdDate >= :createdDateFrom)
      AND (:createdDateTo IS NULL OR p.createdDate <= :createdDateTo)
    ORDER BY p.createdDate DESC
""")
    List<Person> filterUsers(
            @Param("name") String name,
            @Param("rolename") String rolename,
            @Param("active") Boolean active,
            @Param("createdDateFrom") LocalDateTime createdDateFrom,
            @Param("createdDateTo") LocalDateTime createdDateTo
    );

    @Transactional
    @Modifying
    @Query("UPDATE Person p SET p.active = :active WHERE p.personId = :personId")
    void updateActiveByPersonId(@Param("personId") int personId, @Param("active") Boolean active);

    @Query("select count(p) from Person p")
    int countAllUser();
    
    @Query("select count(p) from Person p where p.rolename = 'STAFF_TEST' or p.rolename = 'STAFF_LAB' or p.rolename = 'STAFF_RECEPTION'")
    int countStaffUsers();
    
    @Query("select count(p) from Person p where p.rolename = 'MANAGER'")
    int countManagerUsers();
    
    @Query("select count(p) from Person p where p.rolename = 'ADMIN'")
    int countAdminUsers();


    @Query("""
            select p from Person p where (lower(p.name) like  lower(concat('%',:keyword,'%')) or :keyword is null) and (:start is null 
                        
            or :end is null or p.createdDate between :start and :end ) 
            and lower(p.rolename) like  lower(concat('%',:roleName,'%'))
                        and (:active is null or p.active = :active)
            

            """)
    Page<Person> findByFilter(String keyword, String roleName, LocalDateTime start, LocalDateTime end, Pageable pageable,boolean active);

    int countByRolename(RoleName rolename);
}

