package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.response.NotificationResponse;
import com.dnaeasy.dnaeasy.enity.Notification;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-03T20:07:20+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Microsoft)"
)
@Component
public class NotificationMapperImpl implements NotificationMapper {

    @Override
    public NotificationResponse notitonotresponse(Notification notification) {
        if ( notification == null ) {
            return null;
        }

        NotificationResponse notificationResponse = new NotificationResponse();

        notificationResponse.setNotiID( notification.getNotiID() );
        notificationResponse.setContent( notification.getContent() );
        notificationResponse.setTime( notification.getTime() );
        notificationResponse.setReaded( notification.isReaded() );

        return notificationResponse;
    }
}
