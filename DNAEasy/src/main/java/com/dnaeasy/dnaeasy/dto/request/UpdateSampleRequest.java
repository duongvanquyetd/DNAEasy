package com.dnaeasy.dnaeasy.dto.request;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateSampleRequest {
    private int sampleId;
    private String sampleType;//mong tay/mau/ban chai.v.v.v..v
    private String sampleName;
    private String nextStatusName;
}
