package com.dnaeasy.dnaeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestprocessResponse {
    private boolean isallowCofirmation;
    private String nextStatus;
    private String formfor;
}
