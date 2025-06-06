package com.dnaeasy.dnaeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultUpdateResponse {
    private int resultId;
    private String conclustionResult;
    private String resulFilePDF;
    private String curentStatusResult;
    private LocalDateTime resultTime;
}
