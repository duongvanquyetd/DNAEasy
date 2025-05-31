package com.dnaeasy.dnaeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Data

public class ServiceResponse {
    private Long serviceId; // ID dịch vụ
    private String serviceName;
    private String serviceDescription;
    private Double price;
    private String typeService;
    List<String> imageUrls; // Danh sách URL ảnh trả về cho client
}
