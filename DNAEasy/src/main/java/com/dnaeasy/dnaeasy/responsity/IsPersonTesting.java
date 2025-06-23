package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.enity.PersonTest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IsPersonTesting extends JpaRepository<PersonTest, Long> {

}
