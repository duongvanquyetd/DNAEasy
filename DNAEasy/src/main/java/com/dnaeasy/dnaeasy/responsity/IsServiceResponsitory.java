package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IsServiceResponsitory extends JpaRepository<Service, Long> {
    Service findByServiceId(int serviceId);
}
