package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Sample;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IsSampleRespository extends JpaRepository<Sample, Integer> {
    boolean existsSampleBySamplecode(String samplecode);
}
