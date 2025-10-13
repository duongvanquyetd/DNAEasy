package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.response.ProcessOfTestResponse;
import com.dnaeasy.dnaeasy.enums.SampleMethod;
import com.dnaeasy.dnaeasy.service.IsProcessTestingService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/processtesting")
public class ProcessTessController {
    @Autowired
    IsProcessTestingService isProcessTestingService;
    @GetMapping("/{id}")
    public ResponseEntity<ProcessOfTestResponse> getProcessTesting(@PathVariable("id")int  id) {
        return ResponseEntity.ok(isProcessTestingService.proceesOrder(id));
    }
    @GetMapping("/getcurentOrderProcess/{id}")
    public ResponseEntity<Integer> getOrder(@PathVariable("id")int  id) {

        return ResponseEntity.ok(isProcessTestingService.curentOrder(id));
    }
}
