package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.HardResultCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.HardResultCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.HardResultResponse;
import com.dnaeasy.dnaeasy.dto.response.HardResultTrackingResponse;
import com.dnaeasy.dnaeasy.enity.HardResult;
import com.dnaeasy.dnaeasy.enity.HardResultTracking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface HardResultMapper {
    HardResult  hardCreatetoHardResult(HardResultCreateRequest request);
    @Mapping(target = "tracking",expression = "java(listTracking(hardResult))")
    HardResultResponse hardUpdatetoHardResult(HardResult hardResult);
   HardResultCreateResponse hardCreatetoHardResultCreateResponse(HardResult hardResult);
    default List<HardResultTrackingResponse> listTracking(HardResult hardResult) {
        List<HardResultTrackingResponse> tracking = new ArrayList<HardResultTrackingResponse>();

        for(HardResultTracking h : hardResult.getListTracking()){
            HardResultTrackingResponse trackingResponse = new HardResultTrackingResponse();
             trackingResponse.setTrackingdate(h.getTrackingdate());
             trackingResponse.setStatusName(h.getStatusName());
             trackingResponse.setImgUrl(h.getImgUrl());
             tracking.add(trackingResponse);
        }
        return tracking;
    }

}
