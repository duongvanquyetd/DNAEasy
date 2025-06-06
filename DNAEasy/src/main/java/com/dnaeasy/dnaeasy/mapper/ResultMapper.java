package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.ResultUpdateRequest;
import com.dnaeasy.dnaeasy.dto.response.ResultResponse;
import com.dnaeasy.dnaeasy.dto.response.ResultUpdateResponse;
import com.dnaeasy.dnaeasy.enity.Result;
import com.dnaeasy.dnaeasy.enity.Sample;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ResultMapper {

    @Mapping(target = "relationName", expression = "java(getRelationName(result))")
    @Mapping(target = "samplecode",expression = "java(getsamplecode(result))")
    ResultResponse resultToResponse(Result result);

    default String getRelationName(Result result) {

        List<Sample> sampleList = result.getSampelist();
        String relationName = "";
        for (Sample sample : sampleList) {
            relationName += sample.getPersonTest().getRelationName() + "-";
        }

        return relationName.substring(0, relationName.length() - 1);
    }
    default String getsamplecode(Result result) {
        List<Sample> sampleList = result.getSampelist();
        String sampleCode = "";
        for (Sample sample : sampleList) {
            sampleCode += sample.getSamplecode()+ "-";

        }
        return sampleCode.substring(0, sampleCode.length() - 1);
    }
    ResultUpdateResponse resultToUpdateResponse(Result result);
    Result UpdateRequestToResult(ResultUpdateRequest resultUpdateRequest);
    // relationName;
    // samplecode;
}
