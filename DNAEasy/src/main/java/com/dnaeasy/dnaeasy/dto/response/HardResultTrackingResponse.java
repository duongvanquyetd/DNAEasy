package com.dnaeasy.dnaeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HardResultTrackingResponse {
    private String StatusName;
    private LocalDateTime trackingdate;
    private String imgUrl;
}
