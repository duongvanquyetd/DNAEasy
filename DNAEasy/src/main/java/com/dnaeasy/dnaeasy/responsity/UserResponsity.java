package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserResponsity extends JpaRepository<Person, String> {
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


}
