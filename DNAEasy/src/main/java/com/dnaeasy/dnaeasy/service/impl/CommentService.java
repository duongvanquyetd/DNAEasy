package com.dnaeasy.dnaeasy.service.impl;


import com.dnaeasy.dnaeasy.dto.request.CommentRequest;
import com.dnaeasy.dnaeasy.dto.response.CommentReponse;
import com.dnaeasy.dnaeasy.enity.Comment;
import com.dnaeasy.dnaeasy.enity.CommentImage;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.mapper.CommentMapper;
import com.dnaeasy.dnaeasy.responsity.IsAppointmentResponsitory;
import com.dnaeasy.dnaeasy.responsity.IsCommentRepository;
import com.dnaeasy.dnaeasy.responsity.IsServiceResponsitory;
import com.dnaeasy.dnaeasy.responsity.IsUserResponsity;
import com.dnaeasy.dnaeasy.service.IsCommentService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService implements IsCommentService {

    private final IsCommentRepository commentRepo;
    private final IsUserResponsity personRepo;
    private final IsServiceResponsitory serviceRepo;
    private final CommentMapper commentMapper;
    private final IsAppointmentResponsitory apptRepo;
    private final CloudinaryUtil cloudinaryUtil;

    @Override
    public List<CommentReponse> getCommentsByServiceId(Integer serviceId) {
        List<Comment> comments = commentRepo.findByService_ServiceId(serviceId);
        return comments.stream()
                .map(commentMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public CommentReponse createComment(CommentRequest dto, List<MultipartFile> file) {
        if (!canComment(dto.getServiceId())) {

            throw new ResourceNotFound("Can't create comment.Because you commented");
        }
        com.dnaeasy.dnaeasy.enity.Service service = serviceRepo.findByServiceId(dto.getServiceId());
        // 1) Map → entity chỉ có ID của customer & service
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Person person = personRepo.findByUsername(username);
        Comment entity = commentMapper.toEntity(dto);
        entity.setService(service);
        entity.setCustomer(person);
        service.getComments().add(entity);
        person.getCommentList().add(entity);
        entity.setCommentDate(LocalDateTime.now());

        List<CommentImage> images = new ArrayList<>();

        if (file != null && file.size() > 0) {

            for (MultipartFile fileItem : file) {


                try {

                    String imaurl = cloudinaryUtil.uploadImage(fileItem);
                    CommentImage commentImage = new CommentImage();
                    commentImage.setImgUrl(imaurl);
                    commentImage.setComment(entity);
                    images.add(commentImage);


                } catch (Exception e) {
                    e.printStackTrace();
                }
            }


        }
        entity.getCommentImages().addAll(images);
        Comment comment = commentRepo.save(entity);


        return commentMapper.toResponseDto(comment);
    }

    @Override
    public CommentReponse updateComment(Integer commentId, CommentRequest dto) {

        Comment existing = commentRepo.findById(commentId)
                .orElseThrow(() -> new RuntimeException(
                        "Không tìm thấy Comment id = " + commentId));

        existing.setCommentContent(dto.getCommentContent());
        existing.setRating(dto.getRating());

        Comment updated = commentRepo.save(existing);

        // 4. Map Entity -> DTO và trả về
        return commentMapper.toResponseDto(updated);
    }

    @Override
    public void deleteComment(Integer commentId) {
        if (!commentRepo.existsById(commentId)) {
            throw new RuntimeException("ko tim thay comment" + commentId);
        }
        Comment comment = commentRepo.findByCommentId(commentId);
        com.dnaeasy.dnaeasy.enity.Service service = comment.getService();
        service.getComments().remove(comment);
//        Person person = comment.getCustomer();
//        person.getCommentList().remove(comment);
//        serviceRepo.save(service);

    }

    @Override
    public Optional<CommentReponse> getCommentById(Integer commentId) {
        return commentRepo.findById(commentId)
                .map(commentMapper::toResponseDto);
    }

    @Override
    public boolean canComment(int serviceId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Person person = personRepo.findByUsername(username);
        List<String> stauts = new ArrayList<>();
        stauts.add("COMPLETE");

        com.dnaeasy.dnaeasy.enity.Service service = serviceRepo.findByServiceId(serviceId);
        int appointmnet = apptRepo.countByService_ServiceIdAndCustomer_PersonId(serviceId,person.getPersonId());
        int commnet = commentRepo.countByService_ServiceIdAndCustomer_PersonId(serviceId,person.getPersonId());

//&& !commentRepo.existsByServiceAndCustomer(service, person
        return apptRepo.existsByCustomer_PersonIdAndService_ServiceIdAndCurentStatusAppointmentIsIn(person.getPersonId(), serviceId, stauts) && appointmnet > commnet;
    }


}
