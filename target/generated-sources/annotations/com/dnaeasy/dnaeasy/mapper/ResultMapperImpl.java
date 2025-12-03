package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.ResultUpdateRequest;
import com.dnaeasy.dnaeasy.dto.response.ResultCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.ResultResponse;
import com.dnaeasy.dnaeasy.dto.response.ResultUpdateResponse;
import com.dnaeasy.dnaeasy.enity.HardResult;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.enity.Result;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-03T20:07:21+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Microsoft)"
)
@Component
public class ResultMapperImpl implements ResultMapper {

    @Override
    public ResultCreateResponse resultToResponse(Result result) {
        if ( result == null ) {
            return null;
        }

        ResultCreateResponse resultCreateResponse = new ResultCreateResponse();

        resultCreateResponse.setResultId( result.getResultId() );

        resultCreateResponse.setRelationName( getRelationName(result) );
        resultCreateResponse.setSamplecode( getsamplecode(result) );
        resultCreateResponse.setName( getName(result) );

        return resultCreateResponse;
    }

    @Override
    public ResultUpdateResponse resultToUpdateResponse(Result result) {
        if ( result == null ) {
            return null;
        }

        ResultUpdateResponse resultUpdateResponse = new ResultUpdateResponse();

        resultUpdateResponse.setResultId( result.getResultId() );
        resultUpdateResponse.setConclustionResult( result.getConclustionResult() );
        resultUpdateResponse.setResulFilePDF( result.getResulFilePDF() );
        resultUpdateResponse.setCurentStatusResult( result.getCurentStatusResult() );
        resultUpdateResponse.setResultTime( result.getResultTime() );

        return resultUpdateResponse;
    }

    @Override
    public Result UpdateRequestToResult(ResultUpdateRequest resultUpdateRequest) {
        if ( resultUpdateRequest == null ) {
            return null;
        }

        Result result = new Result();

        result.setResultId( resultUpdateRequest.getResultId() );
        result.setResulFilePDF( resultUpdateRequest.getResulFilePDF() );
        result.setConclustionResult( resultUpdateRequest.getConclustionResult() );

        return result;
    }

    @Override
    public ResultResponse resultToResultResponse(Result result) {
        if ( result == null ) {
            return null;
        }

        ResultResponse resultResponse = new ResultResponse();

        resultResponse.setStaffName( resultStaffName( result ) );
        resultResponse.setHardresultID( resultHardresultId( result ) );
        resultResponse.setResultId( result.getResultId() );
        resultResponse.setConclustionResult( result.getConclustionResult() );
        resultResponse.setResulFilePDF( result.getResulFilePDF() );
        resultResponse.setCurentStatusResult( result.getCurentStatusResult() );
        resultResponse.setResultTime( result.getResultTime() );

        resultResponse.setRelationName( getRelationName(result) );
        resultResponse.setSamplecode( getsamplecode(result) );
        resultResponse.setNameOfPerson( collectName(result) );
        resultResponse.setTracking( listTracking(result) );

        return resultResponse;
    }

    private String resultStaffName(Result result) {
        if ( result == null ) {
            return null;
        }
        Person staff = result.getStaff();
        if ( staff == null ) {
            return null;
        }
        String name = staff.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    private Long resultHardresultId(Result result) {
        if ( result == null ) {
            return null;
        }
        HardResult hardresult = result.getHardresult();
        if ( hardresult == null ) {
            return null;
        }
        Long id = hardresult.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
