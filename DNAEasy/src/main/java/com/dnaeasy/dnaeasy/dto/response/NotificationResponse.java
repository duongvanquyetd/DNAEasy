package com.dnaeasy.dnaeasy.dto.response;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponse {
    private Long notiID;
    private String content;
    private LocalDateTime time;
    private boolean readed;

}
