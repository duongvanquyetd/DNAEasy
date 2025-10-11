package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface IsPersonRepository extends JpaRepository<Person, Long> {
    List<Person> findAllByCreatedDateBetween(LocalDateTime start, LocalDateTime end);

    Person findByPhone(String phone);
}
