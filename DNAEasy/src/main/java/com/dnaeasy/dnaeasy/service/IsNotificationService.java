package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.response.NotificationResponse;
import com.dnaeasy.dnaeasy.enity.Notification;
import com.dnaeasy.dnaeasy.enity.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IsNotificationService {

    NotificationResponse readed(Long id);
    Long NumberOfNotiNotRead();
    Page<NotificationResponse> listnoti(Pageable pageable);

    void createNotification(Person p , String content);

}
