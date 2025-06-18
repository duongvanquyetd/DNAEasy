package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IsServiceResponsitory extends JpaRepository<Service, Long> {
    Service findByServiceId(int serviceId);

    Page<Service> findByServiceNameContainingIgnoreCase(String serviceName, org.springframework.data.domain.Pageable pageable);

    Page<Service> findByTypeServiceContainingIgnoreCase(String typeService, org.springframework.data.domain.Pageable pageable);

    Page<Service> findByTypeServiceContainingIgnoreCaseAndServiceNameContaining(String typeService, String serviceName, Pageable pageable);
}
