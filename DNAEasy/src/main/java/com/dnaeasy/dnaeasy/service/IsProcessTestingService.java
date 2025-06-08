package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.response.ProcessOfTestResponse;
import com.dnaeasy.dnaeasy.enums.SampleMethod;

import java.util.List;

public interface IsProcessTestingService {
    ProcessOfTestResponse proceesOrder(int appointmnetid);
    int curentOrder(int appointmnetid);
}
