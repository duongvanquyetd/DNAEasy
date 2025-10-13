package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

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


    @Query("""
            SELECT s from Service s where s.active=:active 
            and (:serviceName is null or lower( s.serviceName) like lower(concat("%",:serviceName,'%') )
  ) 
              and (:typeService is null or lower( s.typeService) like lower(concat("%",:typeService,'%') )  )

""")
    Page<Service> searchService(String serviceName, String typeService, boolean active, Pageable pageable);
    @Query("""
            SELECT s from Service s where s.active=:active 
            and (:serviceName is null or lower( s.serviceName) like lower(concat("%",:serviceName,'%') )
            or s.servicePrice =:price) 
              and (:typeService is null or lower( s.typeService) like lower(concat("%",:typeService,'%') )  )

""")
    Page<Service> searchServicePrice(String serviceName,BigDecimal price, String typeService, boolean active, Pageable pageable);


}
