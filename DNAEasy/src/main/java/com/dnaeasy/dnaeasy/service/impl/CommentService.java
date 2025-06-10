package com.dnaeasy.dnaeasy.service.impl;


import com.dnaeasy.dnaeasy.dto.request.CommentRequest;
import com.dnaeasy.dnaeasy.dto.response.CommentReponse;
import com.dnaeasy.dnaeasy.enity.Comment;
import com.dnaeasy.dnaeasy.mapper.CommentMapper;
import com.dnaeasy.dnaeasy.responsity.IsAppointmentResponsitory;
import com.dnaeasy.dnaeasy.responsity.IsCommentRepository;
import com.dnaeasy.dnaeasy.responsity.IsPersonComments;
import com.dnaeasy.dnaeasy.responsity.IsServiceResponsitory;
import com.dnaeasy.dnaeasy.service.IsCommentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService implements IsCommentService {

    private final IsCommentRepository commentRepo;
    private final IsPersonComments personRepo;
    private final IsServiceResponsitory serviceRepo;
    private final CommentMapper commentMapper;
    private final IsAppointmentResponsitory apptRepo;

    @Override
    public List<CommentReponse> getCommentsByServiceId(Integer serviceId) {
        List<Comment> comments = commentRepo.findAllByServiceIdWithCustomerAndService(serviceId);
        return comments.stream()
                .map(commentMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public CommentReponse createComment(CommentRequest dto) {
        // 1) Map → entity chỉ có ID của customer & service
        Comment entity = commentMapper.toEntity(dto);
        Comment saved = commentRepo.save(entity);

        // 2) Lấy lại Comment vừa tạo, kèm join‐fetch Customer và Service
        Comment full = commentRepo
                .findByIdWithCustomerAndService(saved.getCommentId())
                .orElseThrow(() -> new RuntimeException("ko tim comment vua tao"));

        // 3) Map → DTO: lúc này full.getCustomer().getName() và full.getService().getServiceName() đã có
        return commentMapper.toResponseDto(full);
    }

    @Override
    public CommentReponse updateComment(Integer commentId, CommentRequest dto) {
        // 1. Lấy entity hiện tại
        Comment existing = commentRepo.findById(commentId)
                .orElseThrow(() -> new RuntimeException(
                        "Không tìm thấy Comment id = " + commentId));

        // 2. Map cập nhật (chỉ commentContent, rating, commentDate)
        commentMapper.updateEntityFromDto(dto, existing);

        // 3. Lưu lại (entity manager sẽ detect update)
        Comment updated = commentRepo.save(existing);

        // 4. Map Entity -> DTO và trả về
        return commentMapper.toResponseDto(updated);
    }

    @Override
    public void deleteComment(Integer commentId) {
        if(!commentRepo.existsById(commentId)){
            throw new RuntimeException("ko tim thay comment" + commentId);
        }
        commentRepo.deleteById(commentId);
    }

    @Override
    public Optional<CommentReponse> getCommentById(Integer commentId) {
        return commentRepo.findById(commentId)
                .map(commentMapper::toResponseDto);
    }

    @Override
    public boolean canComment(int customerId, int serviceId) {
        return apptRepo.existsByCustomer_PersonIdAndService_ServiceId(customerId, serviceId);
    }


}
