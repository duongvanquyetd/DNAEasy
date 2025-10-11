package com.dnaeasy.dnaeasy.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StaticReponse {
    private BigDecimal revenue;
    private BigDecimal expense;
}
