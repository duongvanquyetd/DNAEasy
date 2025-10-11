package com.dnaeasy.dnaeasy.dto.request;

import com.dnaeasy.dnaeasy.enums.SampleMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestProcessRequest {
    private SampleMethod sampleMethod;
}
