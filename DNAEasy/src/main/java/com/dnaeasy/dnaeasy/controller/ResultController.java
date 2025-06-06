package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.ResultRequest;
import com.dnaeasy.dnaeasy.dto.request.ResultUpdateRequest;
import com.dnaeasy.dnaeasy.dto.response.ResultResponse;
import com.dnaeasy.dnaeasy.dto.response.ResultUpdateResponse;
import com.dnaeasy.dnaeasy.service.impl.ResultService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/result")
public class ResultController {
    @Autowired
    ResultService resultService;
    @Autowired
    CloudinaryUtil cloudinaryUtil;

    @PostMapping("/create")
    public ResponseEntity<List<ResultResponse>> createResults(@RequestBody ResultRequest resultRequest) {
        return ResponseEntity.ok(resultService.createResult(resultRequest));

    }
    @GetMapping("/helo")
    public ResponseEntity<String> heloResults() {
        return ResponseEntity.ok("helo");
    }
    @PostMapping("/updateResutl")
    public ResponseEntity<List<ResultUpdateResponse>> updateResults(@RequestPart("result") List<ResultUpdateRequest> resultRequest,@RequestPart("file") List<MultipartFile> file) {

        for(MultipartFile multipartFile : file) {
            for(ResultUpdateRequest resultUpdateRequest : resultRequest) {

                try {
                    resultUpdateRequest.setResulFilePDF(cloudinaryUtil.uploadImage(multipartFile));
                }catch (Exception e){
                    e.printStackTrace();
                }
            }

        }

        return  ResponseEntity.ok(resultService.UpdateResult(resultRequest));
    }
}
