package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.response.ProcessOfTestResponse;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.responsity.IsAppointmentResponsitory;
import com.dnaeasy.dnaeasy.responsity.IsProcessTesting;
import com.dnaeasy.dnaeasy.service.IsProcessTestingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class ProcessTestingService implements IsProcessTestingService {
    @Autowired
    private IsProcessTesting isProcessTesting;
    @Autowired
    private IsAppointmentResponsitory isAppointmentResponsitory;
    @Override
    public ProcessOfTestResponse proceesOrder(int appointmenid) {

        Appointment appointment = isAppointmentResponsitory.findById(appointmenid).orElseThrow(() -> new RuntimeException("appointment not found"));
         List<com.dnaeasy.dnaeasy.enity.ProcessTesting> processTestings = isProcessTesting.findAllBySampleMethod(appointment.getTypeCollect());
         ProcessOfTestResponse processOfTestResponse = new ProcessOfTestResponse();
        List<String> process = new ArrayList<>();
        for (com.dnaeasy.dnaeasy.enity.ProcessTesting processTesting : processTestings) {
            process.add(processTesting.getStatusName());
         }
        processOfTestResponse.setStatusNames(process);
         return processOfTestResponse;
    }
}
