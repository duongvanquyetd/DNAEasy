package com.dnaeasy.dnaeasy.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultRequest {
    private int appoinmentId;
    private int sampleid;
    private String resulFilePDF;
    private String conclustionResult;
}
