package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.SearchRequest;
import com.dnaeasy.dnaeasy.dto.request.ServiceCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.ManagerServiceReponse;
import com.dnaeasy.dnaeasy.dto.response.ServiceCommentResponse;
import com.dnaeasy.dnaeasy.dto.response.ServiceResponse;
import com.dnaeasy.dnaeasy.service.IsServiceService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/service")
public class ServiceController {

    @Autowired
    private IsServiceService serviceService;

    @Autowired
    private CloudinaryUtil cloudinaryUtil;

    @PostMapping("/create")
    public ResponseEntity<ServiceResponse> create(
            @RequestPart("service") ServiceCreateRequest request,
            @RequestPart("file") List<MultipartFile> files
    ) {
        return ResponseEntity.ok(serviceService.create(request, files));

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
            @RequestPart(value = "file", required = false) List<MultipartFile> files,
            @RequestPart(value = "removeimg", required = false) List<String> removeimg
    ) throws IOException {


        return ResponseEntity.ok(serviceService.update(id, request, files, removeimg));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        serviceService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/search")
    public ResponseEntity<Page<ServiceResponse>> search(@RequestBody SearchRequest request,
                                                        @RequestParam("page") int page,
                                                        @RequestParam("size") int size,
                                                        @RequestParam("active") boolean active,
                                                        @RequestParam("sortcolumn") String sortcolumn,
                                                        @RequestParam("sortmode") String mode) {
        Pageable pageable = null;
        if (!sortcolumn.equals("null")) {
            if (mode.equals("asc")) {
                pageable = PageRequest.of(page - 1, size, Sort.by(sortcolumn).ascending());
            } else {
                pageable = PageRequest.of(page - 1, size, Sort.by(sortcolumn).descending());
            }

        } else {
            pageable = PageRequest.of(page - 1, size);
        }


        return ResponseEntity.ok(serviceService.search(request, pageable, active));
    }

    @GetMapping("/report")
    public ResponseEntity<ManagerServiceReponse> ManagerReport() {


        return ResponseEntity.ok(serviceService.report());
    }

    @PostMapping("/active/{id}")
    public ResponseEntity<ServiceResponse> Active(@PathVariable Long id) {

        return ResponseEntity.ok(serviceService.Active(id));
    }

    @GetMapping("/starAndNumber/{id}")
    public ResponseEntity<ServiceCommentResponse> StarAndNumber(@PathVariable int id) {
        return ResponseEntity.ok(serviceService.getNumberCommnentAndStar(id));
    }

    @GetMapping("/canmodifi/{id}")
    public ResponseEntity<Boolean> CanModify(@PathVariable Long id) {

        return ResponseEntity.ok(serviceService.CanEditDelete(id));
    }

}
