package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.SampleCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.UpdateSampleRequest;
import com.dnaeasy.dnaeasy.dto.response.SampleResponse;
import com.dnaeasy.dnaeasy.dto.response.TestprocessResponse;
import com.dnaeasy.dnaeasy.enity.Sample;
import com.dnaeasy.dnaeasy.service.impl.SampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/sample")
public class SampleController {
    @Autowired
    SampleService sampleService;
    @PostMapping("/create")
    public ResponseEntity<List<SampleResponse>> createSample(@RequestBody SampleCreateRequest sampleCreateRequest) {
        return ResponseEntity.ok(sampleService.Create(sampleCreateRequest));
    }
    // xem người login hiện tại có được cofirm status tiếp theo hay không và lấy status tiếp theo lên
    @PostMapping("/nextStatusAndAllow") ResponseEntity<TestprocessResponse> isAllowCofirmation(@RequestBody SampleCreateRequest sampleCreateRequest) {
        return ResponseEntity.ok(sampleService.isAllowCofirmation(sampleCreateRequest));
    }
    @GetMapping("/currenstatus/{id}")
    public ResponseEntity<String> getCurrentStatus(@PathVariable("id") int id) {
        return  ResponseEntity.ok(sampleService.getCurrentStatus(id));
    }
    @GetMapping("/getbyappoinmenid/{id}")
    public ResponseEntity<List<SampleResponse>> getByAppointmentId(@PathVariable("id") int id) {
        return ResponseEntity.ok(sampleService.getbyAppoinment(id));
    }

    @PostMapping("/confirmhaveForm")
    public ResponseEntity<List<SampleResponse>> confirmHaveForm(
            @RequestBody List<UpdateSampleRequest>  list){

        return ResponseEntity.ok(sampleService.UpdateSampleHaveForm(list));
    }
}
