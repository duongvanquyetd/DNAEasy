package com.dnaeasy.dnaeasy.controller;


import com.dnaeasy.dnaeasy.dto.request.CommentRequest;
import com.dnaeasy.dnaeasy.dto.response.CommentReponse;
import com.dnaeasy.dnaeasy.enity.Comment;
import com.dnaeasy.dnaeasy.service.IsCommentService;
import com.dnaeasy.dnaeasy.service.IsPersonService;
import com.dnaeasy.dnaeasy.service.impl.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@Validated
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

            @RequestBody @Validated CommentRequest dto
    ) {

        return ResponseEntity.ok(commentService.createComment(dto));
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


}
