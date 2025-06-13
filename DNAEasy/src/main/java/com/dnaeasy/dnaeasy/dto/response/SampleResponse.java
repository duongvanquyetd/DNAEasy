package com.dnaeasy.dnaeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SampleResponse {
    private int sampleid;
    private String sampleType;//mong tay/mau/ban chai.v.v.v..v
    private String samplecode;

    private String cureStatusSample;
    private String CCCD;
    private String relationName;
    private String name;
   List<SampleTrackingResponse> sampleTracking;

}
