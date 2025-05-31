package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.response.ProcessOfTestResponse;
import com.dnaeasy.dnaeasy.enums.SampleMethod;
import com.dnaeasy.dnaeasy.service.IsProcessTestingService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/processtesting")
public class ProcessTessController {
    @Autowired
    IsProcessTestingService isProcessTestingService;
    @GetMapping("/{id}")
    public ResponseEntity<ProcessOfTestResponse> getProcessTesting(@PathVariable("id")int  id) {
        return ResponseEntity.ok(isProcessTestingService.proceesOrder(id));
    }
}
