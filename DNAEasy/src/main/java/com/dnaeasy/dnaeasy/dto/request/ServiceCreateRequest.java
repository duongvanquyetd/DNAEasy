package com.dnaeasy.dnaeasy.dto.request;

import com.dnaeasy.dnaeasy.enity.ServiceImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceCreateRequest {
    private String serviceName;
    private String serviceDescription;
    private BigDecimal servicePrice;
    private String typeService;
    List<ServiceImage> serviceImageList;
}