package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.response.SampleResponse;
import com.dnaeasy.dnaeasy.dto.response.SampleTrackingResponse;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.AppointmnentTracking;
import com.dnaeasy.dnaeasy.enity.Sample;
import com.dnaeasy.dnaeasy.enity.SampleTracking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper(componentModel = "spring")
public interface SampleMapper {

    @Mapping(target = "CCCD" , source = "personTest.CCCD")
    @Mapping(target = "relationName" ,source = "personTest.relationName")
    @Mapping(target = "name",source = "personTest.name")
    @Mapping(target = "sampleTracking" , expression = "java(SampleTrackingToList(sample))")
    SampleResponse SampeToSampleResponse(Sample sample);
    default List<SampleTrackingResponse> SampleTrackingToList(Sample sample) {
        List<SampleTrackingResponse> sampleTrackingResponses = new ArrayList<>();
        for(SampleTracking a : sample.getSampleTracking()) {
            SampleTrackingResponse sampleTrackingResponse = new SampleTrackingResponse();
            sampleTrackingResponse.setSampleTrackingTime(a.getStatusDate());
            sampleTrackingResponse.setNameStatus(a.getStatusName());
            sampleTrackingResponse.setImageUrl(a.getImageUrl());
            sampleTrackingResponses.add(sampleTrackingResponse);
        }
        return sampleTrackingResponses;
    }

}
