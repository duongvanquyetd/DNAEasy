package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.HardResultCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.HardResultCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.HardResultResponse;
import com.dnaeasy.dnaeasy.enity.HardResult;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-03T20:07:21+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Microsoft)"
)
@Component
public class HardResultMapperImpl implements HardResultMapper {

    @Override
    public HardResult hardCreatetoHardResult(HardResultCreateRequest request) {
        if ( request == null ) {
            return null;
        }

        HardResult hardResult = new HardResult();

        hardResult.setAddress( request.getAddress() );
        hardResult.setPhone( request.getPhone() );
        hardResult.setType( request.getType() );

        return hardResult;
    }

    @Override
    public HardResultResponse hardUpdatetoHardResult(HardResult hardResult) {
        if ( hardResult == null ) {
            return null;
        }

        HardResultResponse hardResultResponse = new HardResultResponse();

        hardResultResponse.setId( hardResult.getId() );
        hardResultResponse.setAddress( hardResult.getAddress() );
        hardResultResponse.setPhone( hardResult.getPhone() );
        hardResultResponse.setType( hardResult.getType() );

        hardResultResponse.setTracking( listTracking(hardResult) );

        return hardResultResponse;
    }

    @Override
    public HardResultCreateResponse hardCreatetoHardResultCreateResponse(HardResult hardResult) {
        if ( hardResult == null ) {
            return null;
        }

        HardResultCreateResponse hardResultCreateResponse = new HardResultCreateResponse();

        hardResultCreateResponse.setId( hardResult.getId() );

        return hardResultCreateResponse;
    }
}
