package com.dnaeasy.dnaeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SampleTrackingResponse {
    private String imageUrl;
    private String nameStatus;
    private LocalDateTime sampleTrackingTime;

}
