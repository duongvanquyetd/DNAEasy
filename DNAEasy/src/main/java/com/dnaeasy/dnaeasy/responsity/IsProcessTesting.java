package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.ProcessTesting;
import com.dnaeasy.dnaeasy.enums.SampleMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IsProcessTesting extends JpaRepository<ProcessTesting,Integer> {
 ProcessTesting findByOrderProcessAndSampleMethod(Integer orderProcess, SampleMethod sampleMethod);
 ProcessTesting findOrderProcessByStatusName(String statusName);

 List<ProcessTesting> findAllBySampleMethod(SampleMethod sampleMethod);
}
