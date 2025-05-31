package com.dnaeasy.dnaeasy.dto.response;

import com.dnaeasy.dnaeasy.enums.SampleMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProcessOfTestResponse {
    private List<String> statusNames;
}
