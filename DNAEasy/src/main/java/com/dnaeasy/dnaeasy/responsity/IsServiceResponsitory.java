package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface IsServiceResponsitory extends JpaRepository<Service, Long> {
    Service findByServiceId(int serviceId);

    Page<Service> findByServiceNameContainingIgnoreCase(String serviceName, org.springframework.data.domain.Pageable pageable);

    Page<Service> findByTypeServiceContainingIgnoreCase(String typeService, org.springframework.data.domain.Pageable pageable);

    Page<Service> findByTypeServiceContainingIgnoreCaseAndServiceNameContaining(String typeService, String serviceName, Pageable pageable);
    @Query("select  sum(s.servicePrice) from Service  s ")
    BigDecimal totalprice();
    @Query("select  (sum (s.servicePrice)/count(*))from Service  s ")
    BigDecimal avgamount();

    Page<Service> findByTypeServiceContainingIgnoreCaseAndServiceNameContainingAndActive(String typeService, String serviceName, boolean active,Pageable pageable);

    Page<Service> findByServiceNameContainingIgnoreCaseAndActive(String serviceName, boolean active, Pageable pageable);

    Page<Service> findByTypeServiceContainingIgnoreCaseAndActive(String typeService, boolean active, Pageable pageable);


    Page<Service> findAllByActive(boolean active, Pageable pageable);

    Service findByServiceNameContainingIgnoreCaseAndActive(String serviceName, boolean active);

    int countByServiceNameAndActive(String serviceName, boolean active);

    long countByActive(boolean active);
}
