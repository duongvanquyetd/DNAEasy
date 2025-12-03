package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.response.SampleResponse;
import com.dnaeasy.dnaeasy.enity.PersonTest;
import com.dnaeasy.dnaeasy.enity.Sample;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-03T20:07:20+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Microsoft)"
)
@Component
public class SampleMapperImpl implements SampleMapper {

    @Override
    public SampleResponse SampeToSampleResponse(Sample sample) {
        if ( sample == null ) {
            return null;
        }

        SampleResponse sampleResponse = new SampleResponse();

        sampleResponse.setCCCD( samplePersonTestCCCD( sample ) );
        sampleResponse.setRelationName( samplePersonTestRelationName( sample ) );
        sampleResponse.setName( samplePersonTestName( sample ) );
        sampleResponse.setSampleid( sample.getSampleid() );
        sampleResponse.setSampleType( sample.getSampleType() );
        sampleResponse.setSamplecode( sample.getSamplecode() );
        sampleResponse.setCureStatusSample( sample.getCureStatusSample() );

        sampleResponse.setSampleTracking( SampleTrackingToList(sample) );

        return sampleResponse;
    }

    private String samplePersonTestCCCD(Sample sample) {
        if ( sample == null ) {
            return null;
        }
        PersonTest personTest = sample.getPersonTest();
        if ( personTest == null ) {
            return null;
        }
        String cCCD = personTest.getCCCD();
        if ( cCCD == null ) {
            return null;
        }
        return cCCD;
    }

    private String samplePersonTestRelationName(Sample sample) {
        if ( sample == null ) {
            return null;
        }
        PersonTest personTest = sample.getPersonTest();
        if ( personTest == null ) {
            return null;
        }
        String relationName = personTest.getRelationName();
        if ( relationName == null ) {
            return null;
        }
        return relationName;
    }

    private String samplePersonTestName(Sample sample) {
        if ( sample == null ) {
            return null;
        }
        PersonTest personTest = sample.getPersonTest();
        if ( personTest == null ) {
            return null;
        }
        String name = personTest.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }
}
