package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Notification;
import com.dnaeasy.dnaeasy.enity.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface IsNotificationRepo extends JpaRepository<Notification, Long> {
    Long countByReadedAndPerson(boolean readed, Person person);
    Page<Notification> findAllByPerson(Person person, Pageable pageable);


}
