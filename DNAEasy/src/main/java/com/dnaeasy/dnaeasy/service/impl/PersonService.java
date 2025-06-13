package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.responsity.IsPersonComments;
import com.dnaeasy.dnaeasy.service.IsPaymentService;
import com.dnaeasy.dnaeasy.service.IsPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
@RequiredArgsConstructor
public class PersonService implements IsPersonService {

    private final IsPersonComments personRepo;

    @Override
    public Optional<Person> findByUsername(String username) {
        return personRepo.findByUsername(username);
    }
}
