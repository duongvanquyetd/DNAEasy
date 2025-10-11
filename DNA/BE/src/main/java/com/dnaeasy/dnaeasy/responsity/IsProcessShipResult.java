package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.ProcessShipResult;
import com.dnaeasy.dnaeasy.enums.TypeReciveResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IsProcessShipResult extends JpaRepository<ProcessShipResult, Long> {
    ProcessShipResult findALlByTypeAndOrderProcess(TypeReciveResult type, int orderProcess);

    ProcessShipResult findALlByTypeAndStatusName(TypeReciveResult type, String statusName);
}
