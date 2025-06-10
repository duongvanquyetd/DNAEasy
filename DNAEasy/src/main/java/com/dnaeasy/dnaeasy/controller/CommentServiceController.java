package com.dnaeasy.dnaeasy.controller;


import com.dnaeasy.dnaeasy.dto.request.CommentRequest;
import com.dnaeasy.dnaeasy.dto.response.CommentReponse;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.service.IsCommentService;
import com.dnaeasy.dnaeasy.service.IsPersonService;
import com.dnaeasy.dnaeasy.service.impl.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@Validated
public class CommentServiceController {

    private final IsCommentService commentService;
    private final IsPersonService  personService;

    @GetMapping("/{serviceId}")
    public ResponseEntity<List<CommentReponse>> getByServiceId(
            @PathVariable("serviceId") Integer serviceId
    ) {
        List<CommentReponse> list = commentService.getCommentsByServiceId(serviceId);
        return ResponseEntity.ok(list);
    }


    @PostMapping("/service/{serviceId}")
    public ResponseEntity<CommentReponse> createComment(
            @PathVariable("serviceId") Integer serviceId,
            @RequestBody @Validated CommentRequest dto
    ) {
        // Gán chính xác serviceId từ PathVariable vào dto, tránh client truyền sai
        dto.setServiceId(serviceId);
        CommentReponse created = commentService.createComment(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/update/{commentId}")
    public ResponseEntity<CommentReponse> updateComment(
            @PathVariable("commentId") Integer commentId,
            @RequestBody @Validated CommentRequest dto) {
        CommentReponse updated = commentService.updateComment(commentId, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable("commentId") Integer commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/cancomment/{serviceId}")
    public ResponseEntity<Map<String, Boolean>> canComment(
            @PathVariable Integer serviceId,
            Authentication authentication    // ← nhận Authentication
    ) {
        // Lấy username ra từ token
        String username = authentication.getName();
        // hoặc:
        // Jwt jwt = (Jwt) authentication.getPrincipal();
        // String username = jwt.getSubject();

        Person current = personService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));

        boolean ok = commentService.canComment(
                current.getPersonId(),
                serviceId
        );
        return ResponseEntity.ok(Map.of("canComment", ok));
    }


}
