package com.dnaeasy.dnaeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentListResponse {
    private List<PaymentSummaryDTO> payments;
    private long totalElements;
    private int totalPages;
    private int currentPage;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaymentSummaryDTO {
        private int paymentId;
        private String contenPayment;
        private boolean isExpense;
        private BigDecimal paymentAmount;
        private LocalDateTime paymentDate;
        private String paymentMethod;
        private String paycode;
    }
} 