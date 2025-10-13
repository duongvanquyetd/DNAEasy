package com.dnaeasy.dnaeasy.dto.response;

import com.dnaeasy.dnaeasy.enums.TypeReciveResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HardResultResponse {
    private Long id;
    private String address;
    private String phone;
    private TypeReciveResult type;
    private List<HardResultTrackingResponse> tracking;
}
