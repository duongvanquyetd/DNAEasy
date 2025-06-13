package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IsPersonComments extends JpaRepository<Person, Long> {
    Optional<Person> findByUsername(String username);
}