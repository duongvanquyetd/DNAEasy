package com.dnaeasy.dnaeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ManagerServiceReponse {
    private long count;
    private BigDecimal totalamount;
    private BigDecimal avgamount;
    private long active;
    private long inactive;
}
