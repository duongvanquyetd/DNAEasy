package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.enity.Result;
import com.dnaeasy.dnaeasy.enity.Sample;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IsResultResponsitory extends JpaRepository<Result, Integer> {
    List<Sample> findByResultId(int resultId);

    Result findResultsByResultId(int resultId);

    Result findByStaff(Person staff);

    List<Result> findAllByStaff(Person staff);
}
