package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.HardResultCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.UpdatehardReusltRequest;
import com.dnaeasy.dnaeasy.dto.response.CanConfirmHardResultRespone;
import com.dnaeasy.dnaeasy.dto.response.HardResultCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.HardResultResponse;
import com.dnaeasy.dnaeasy.service.impl.HardResultSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/hardresult")
public class HardResultController {

    @Autowired
    HardResultSerivce hardResultSerivce;
    @PostMapping("/create")
    public ResponseEntity<HardResultCreateResponse> createHardResult(@RequestBody HardResultCreateRequest request) {
        return  ResponseEntity.ok(hardResultSerivce.CreateHardResult(request));
    }
    @GetMapping("/canconfirm/{id}")
    public ResponseEntity<CanConfirmHardResultRespone> canconfirmHardResult(@PathVariable("id") Long request) {
        return ResponseEntity.ok(hardResultSerivce.CanConfirm(request));

    }
    @PostMapping("/update")
    public ResponseEntity<HardResultResponse> updateHardResult(@RequestPart("hardresult") UpdatehardReusltRequest request,@RequestPart("file") MultipartFile file) {
        return ResponseEntity.ok(hardResultSerivce.updateHardResult(request,file));
    }
}
