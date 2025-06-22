package com.dnaeasy.dnaeasy.dto.request;

import com.dnaeasy.dnaeasy.enums.TypeReciveResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HardResultCreateRequest {
    private List<Integer> resultid;
    private String address;
    private String phone;
    private TypeReciveResult type;
}
