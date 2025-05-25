package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.InvalidToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IsInvalidateToken extends JpaRepository<InvalidToken, Integer> {
    boolean existsInvalidTokenById(String id);
}
