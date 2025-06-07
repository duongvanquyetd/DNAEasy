package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.ServiceCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.ServiceResponse;
import com.dnaeasy.dnaeasy.enity.Service;
import com.dnaeasy.dnaeasy.enity.ServiceImage;
import com.dnaeasy.dnaeasy.service.impl.IsServiceService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/service")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

    @Autowired
    private IsServiceService serviceService;

    @Autowired
    private CloudinaryUtil cloudinaryUtil;

    @PostMapping("/create")
    public ResponseEntity<ServiceResponse> create(
            @RequestPart("service") ServiceCreateRequest request,
            @RequestPart("file") List<MultipartFile> files
    ) throws IOException {
        List<ServiceImage> imgs = new ArrayList<>();
        for (MultipartFile file : files) {
            ServiceImage img = new ServiceImage();
            img.setBlogImageName(file.getOriginalFilename());
            img.setBlogImagePath(cloudinaryUtil.uploadImage(file));
            imgs.add(img);
        }
        request.setServiceImageList(imgs);
        Service created = serviceService.create(request);
        return ResponseEntity.ok(serviceService.getById((long) created.getServiceId())
        );
    }

    @GetMapping
    public ResponseEntity<List<ServiceResponse>> getAll() {
        return ResponseEntity.ok(serviceService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(serviceService.getById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ServiceResponse> update(
            @PathVariable Long id,
            @RequestPart("service") ServiceCreateRequest request,
            @RequestPart("file") List<MultipartFile> files
    ) throws IOException {
        List<ServiceImage> imgs = new ArrayList<>();
        for (MultipartFile file : files) {
            ServiceImage img = new ServiceImage();
            img.setBlogImageName(file.getOriginalFilename());
            img.setBlogImagePath(cloudinaryUtil.uploadImage(file));
            imgs.add(img);
        }
        request.setServiceImageList(imgs);
        serviceService.update(id, request);
        return ResponseEntity.ok(serviceService.getById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        serviceService.delete(id);
        return ResponseEntity.ok().build();
    }
}
