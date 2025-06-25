package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.response.NotificationResponse;
import com.dnaeasy.dnaeasy.enity.Notification;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    NotificationResponse notitonotresponse(Notification notification);
}
