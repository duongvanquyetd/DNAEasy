package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.enity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface IsPersonService{

    Optional<Person> findByUsername(String username);

}
