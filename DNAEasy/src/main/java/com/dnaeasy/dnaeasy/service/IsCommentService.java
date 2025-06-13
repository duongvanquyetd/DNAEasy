package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.CommentRequest;
import com.dnaeasy.dnaeasy.dto.response.CommentReponse;

import java.util.List;
import java.util.Optional;

public interface IsCommentService {
    List<CommentReponse> getCommentsByServiceId(Integer serviceId);

    CommentReponse createComment(CommentRequest dto);

    CommentReponse updateComment(Integer commentId, CommentRequest dto);

    void deleteComment(Integer commentId);

    Optional<CommentReponse> getCommentById(Integer commentId);

    boolean canComment(int customerId, int serviceId);

}
