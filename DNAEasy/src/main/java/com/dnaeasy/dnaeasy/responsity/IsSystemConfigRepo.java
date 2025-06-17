package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.SystemConfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IsSystemConfigRepo extends JpaRepository<SystemConfig, Long> {

    SystemConfig findByName(String name);
}
