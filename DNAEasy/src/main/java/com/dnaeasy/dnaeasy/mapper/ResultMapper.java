package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.ResultUpdateRequest;
import com.dnaeasy.dnaeasy.dto.response.HardResultTrackingResponse;
import com.dnaeasy.dnaeasy.dto.response.ResultCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.ResultResponse;
import com.dnaeasy.dnaeasy.dto.response.ResultUpdateResponse;
import com.dnaeasy.dnaeasy.enity.HardResult;
import com.dnaeasy.dnaeasy.enity.HardResultTracking;
import com.dnaeasy.dnaeasy.enity.Result;
import com.dnaeasy.dnaeasy.enity.Sample;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface ResultMapper {

    @Mapping(target = "relationName", expression = "java(getRelationName(result))")
    @Mapping(target = "samplecode",expression = "java(getsamplecode(result))")
    @Mapping(target = "name",expression = "java(getName(result))")
    ResultCreateResponse resultToResponse(Result result);

    default String getRelationName(Result result) {

        Set<Sample> sampleList = result.getSampelist();
        String relationName = "";
        for (Sample sample : sampleList) {
            if(sample.getPersonTest().getRelationName() == null)
            {
                return null;
            }
            relationName += sample.getPersonTest().getRelationName() + "-";
        }

        return relationName.substring(0, relationName.length() - 1);
    }
    default String getsamplecode(Result result) {
        Set<Sample> sampleList = result.getSampelist();
        String sampleCode = "";
        for (Sample sample : sampleList) {
            sampleCode += sample.getSamplecode()+ "-";

        }
        return sampleCode.substring(0, sampleCode.length() - 1);
    }
    default  String getName(Result result) {
        Set<Sample> sampleList = result.getSampelist();
        String name = "";
        for (Sample sample : sampleList) {
            name += sample.getPersonTest().getName() + "-";

        }
        return name.substring(0, name.length() - 1);
    }
    ResultUpdateResponse resultToUpdateResponse(Result result);
    Result UpdateRequestToResult(ResultUpdateRequest resultUpdateRequest);

    @Mapping(target = "relationName", expression = "java(getRelationName(result))")
    @Mapping(target = "samplecode",expression = "java(getsamplecode(result))")
    @Mapping(target = "staffName" ,source = "staff.name")
    @Mapping(target = "nameOfPerson",expression = "java(collectName(result))")
    @Mapping(target = "hardresultID",source = "hardresult.id")
    @Mapping(target="tracking",expression = "java(listTracking(result))")
    ResultResponse resultToResultResponse(Result result);
    default List<HardResultTrackingResponse> listTracking(Result result) {
        List<HardResultTrackingResponse> tracking = new ArrayList<HardResultTrackingResponse>();

        if(result.getHardresult() != null){
            for(HardResultTracking h : result.getHardresult().getListTracking()){
                HardResultTrackingResponse trackingResponse = new HardResultTrackingResponse();
                trackingResponse.setTrackingdate(h.getTrackingdate());
                trackingResponse.setStatusName(h.getStatusName());
                trackingResponse.setImgUrl(h.getImgUrl());
                tracking.add(trackingResponse);
            }
        }

        return tracking;
    }
    default String collectName (Result result)
    {
        Set<Sample> sampleList = result.getSampelist();
        String Name = "";
        for (Sample sample : sampleList) {
            Name += sample.getPersonTest().getName() + "-";
        }
        return Name.substring(0, Name.length() - 1);


    }
    // relationName;
    // samplecode;
}
