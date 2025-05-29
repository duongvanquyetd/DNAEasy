package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.ProcessTesting;
import com.dnaeasy.dnaeasy.enums.SampleMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IsProcessTesting extends JpaRepository<ProcessTesting,Integer> {

    @Query("Select p.statusName from ProcessTesting  p where p.sampleMethod =:sampleMethod and  p.orderProcess = 1 ")
    String getFirstStatusNameBySampleMethod(SampleMethod sampleMethod);
}
