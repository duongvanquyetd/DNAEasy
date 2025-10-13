package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.CommentRequest;
import com.dnaeasy.dnaeasy.dto.request.SearchCommnentRequest;
import com.dnaeasy.dnaeasy.dto.response.CommentReponse;
import com.dnaeasy.dnaeasy.dto.response.CommentReportResponse;
import com.dnaeasy.dnaeasy.dto.response.ManageCommentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface IsCommentService {
    List<CommentReponse> getCommentsByServiceId(Integer serviceId);

    CommentReponse createComment(CommentRequest dto, List<MultipartFile> file);

    CommentReponse updateComment(Integer commentId, CommentRequest dto);

    void deleteComment(Integer commentId);

    Optional<CommentReponse> getCommentById(Integer commentId);

    boolean canComment(int serviceId);

    Page<ManageCommentResponse> getALlForManageComment(SearchCommnentRequest request, Pageable
            pageable);

    CommentReportResponse getCommentReport();


}
