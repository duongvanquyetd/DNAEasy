package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.response.SampleResponse;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.AppointmnentTracking;
import com.dnaeasy.dnaeasy.enity.Sample;
import com.dnaeasy.dnaeasy.enity.SampleTracking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Mapper(componentModel = "spring")
public interface SampleMapper {
    @Mapping(target = "sampleTracking" , expression = "java(SampleTrackinToMap(sample))")
    SampleResponse SampeToSampleResponse(Sample sample);
    default Map<String, LocalDateTime> SampleTrackinToMap(Sample sample) {
        Map<String, LocalDateTime> sampleTraking = new HashMap<>();
        for(SampleTracking a : sample.getTracks()) {
            sampleTraking.put(a.getStatusName(),a.getStatusDate());
        }
        return sampleTraking;
    }

}
