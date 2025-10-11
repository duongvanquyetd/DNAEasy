package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Sample;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IsSampleRespository extends JpaRepository<Sample, Integer> {
    boolean existsSampleBySamplecode(String samplecode);

    List<Sample> findAllByResult_ResultId(int resultResultId);
}
