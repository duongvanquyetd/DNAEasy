package com.dnaeasy.dnaeasy.service.impl;


import com.dnaeasy.dnaeasy.dto.response.NotificationResponse;
import com.dnaeasy.dnaeasy.enity.Notification;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.mapper.NotificationMapper;
import com.dnaeasy.dnaeasy.responsity.IsNotificationRepo;
import com.dnaeasy.dnaeasy.responsity.IsUserResponsity;
import com.dnaeasy.dnaeasy.service.IsNotificationService;
import com.dnaeasy.dnaeasy.service.IsUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotificationService implements IsNotificationService {

    @Autowired
    IsNotificationRepo isNotificationRepo;
    @Autowired
    NotificationMapper notificationMapper;
    @Autowired
    IsUserResponsity isUserResponsity;
    @Override
    public NotificationResponse readed(Long id) {
        Notification notification = isNotificationRepo.findById(id).orElseThrow(()->new ResourceNotFound("Notification not found"));

        notification.setReaded(true);
        return notificationMapper.notitonotresponse(isNotificationRepo.save(notification));
    }

    @Override
    public Long NumberOfNotiNotRead() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Person  p= isUserResponsity.findByUsername(username);
        Long number = isNotificationRepo.countByReadedAndPerson(false,p);
        return number;
    }

    @Override
    public Page<NotificationResponse> listnoti(Pageable pageable) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Person  p= isUserResponsity.findByUsername(username);
        Page<Notification> notifications = isNotificationRepo.findAllByPerson(p,pageable);

        return  notifications.map(notificationMapper::notitonotresponse);
    }

    @Override
    public void createNotification(Person p, String content) {
        Notification notification = new Notification();
        notification.setTime(LocalDateTime.now());
        notification.setPerson(p);
        notification.setContent(content);
        notification.setPerson(p);
        p.getNotification().add(notification);

        isUserResponsity.save(p);

    }
}
