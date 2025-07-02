package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.response.NotificationResponse;
import com.dnaeasy.dnaeasy.enity.Notification;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.responsity.IsNotificationRepo;
import com.dnaeasy.dnaeasy.responsity.IsUserResponsity;
import com.dnaeasy.dnaeasy.service.impl.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    NotificationService notificationService;



    @GetMapping
    public ResponseEntity<Page<NotificationResponse>> listnoti(
            @RequestParam("size") int size,
            @RequestParam("page") int page) {

        Pageable pageable = PageRequest.of(page-1,size,Sort.by("time").descending());
        return ResponseEntity.ok(notificationService.listnoti(pageable));
    }

    @GetMapping("/readed/{id}")
    public  ResponseEntity<NotificationResponse> readed(@PathVariable Long id){
        return ResponseEntity.ok(notificationService.readed(id));
    }
    @GetMapping("/notinotread")
    public ResponseEntity<Long> numberNotiNotRead(){
        return  ResponseEntity.ok(notificationService.NumberOfNotiNotRead());
    }

    @GetMapping("/readedall")
    public ResponseEntity<Void> readedAll(){

         notificationService.ReadedALl();
         return ResponseEntity.ok().build();
    }

}
