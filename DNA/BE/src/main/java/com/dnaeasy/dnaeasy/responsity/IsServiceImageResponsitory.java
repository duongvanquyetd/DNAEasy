package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.ServiceImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IsServiceImageResponsitory extends JpaRepository<ServiceImage, Long> {
}