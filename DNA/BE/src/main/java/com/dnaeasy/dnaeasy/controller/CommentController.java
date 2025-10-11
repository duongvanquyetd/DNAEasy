package com.dnaeasy.dnaeasy.controller;


import com.dnaeasy.dnaeasy.dto.request.CommentRequest;
import com.dnaeasy.dnaeasy.dto.request.SearchCommnentRequest;
import com.dnaeasy.dnaeasy.dto.response.CommentReponse;
import com.dnaeasy.dnaeasy.dto.response.CommentReportResponse;
import com.dnaeasy.dnaeasy.dto.response.ManageCommentResponse;
import com.dnaeasy.dnaeasy.service.impl.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@Validated
@CrossOrigin("*")
public class CommentController {

    private final CommentService commentService;


    @GetMapping("/{serviceId}")
    public ResponseEntity<List<CommentReponse>> getByServiceId(
            @PathVariable("serviceId") Integer serviceId
    ) {
        List<CommentReponse> list = commentService.getCommentsByServiceId(serviceId);
        return ResponseEntity.ok(list);
    }


    @PostMapping("/create")
    public ResponseEntity<CommentReponse> createComment(

            @RequestPart("comment") @Validated CommentRequest dto,@RequestPart(value = "file",required = false) List<MultipartFile> file
    ) {

        return ResponseEntity.ok(commentService.createComment(dto,file));
    }

    @PutMapping("/update/{commentId}")
    public ResponseEntity<CommentReponse> updateComment(
            @PathVariable("commentId") Integer commentId,
            @RequestBody @Validated CommentRequest dto) {

        return ResponseEntity.ok(commentService.updateComment(commentId, dto));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable("commentId") Integer commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/cancomment/{serviceId}")
    public ResponseEntity<Boolean> canComment(
            @PathVariable int serviceId

    ) {
        return ResponseEntity.ok(commentService.canComment(serviceId));
    }
    @PostMapping("/managercomment")
    public ResponseEntity<Page<ManageCommentResponse>> getManagerComment(@RequestParam("page") int page,
                                                                        @RequestParam("size") int size,
                                                                        @RequestBody SearchCommnentRequest request
                                                                  )
    {
        System.out.println("Star"+request.getStar());
        Pageable pageable = PageRequest.of(page-1,size,Sort.by("rating").descending());
        return ResponseEntity.ok(commentService.getALlForManageComment(request,pageable));
    }
    @GetMapping("/commentReport")
    public ResponseEntity<CommentReportResponse>  reportComment()
    {
        return  ResponseEntity.ok(commentService.getCommentReport());
    }

}
