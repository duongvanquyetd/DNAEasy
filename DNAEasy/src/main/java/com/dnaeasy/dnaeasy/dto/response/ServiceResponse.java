package com.dnaeasy.dnaeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Data

public class ServiceResponse {
    private Long serviceId; // ID dịch vụ
    private String serviceName;
    private String serviceDescription;
    private BigDecimal price;
    private String typeService;
    List<String> imageUrls;
    private boolean active;// Danh sách URL ảnh trả về cho client
    private int sample_count;
}
