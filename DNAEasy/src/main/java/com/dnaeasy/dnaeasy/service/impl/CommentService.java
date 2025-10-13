package com.dnaeasy.dnaeasy.service.impl;


import com.dnaeasy.dnaeasy.dto.request.CommentRequest;
import com.dnaeasy.dnaeasy.dto.request.SearchCommnentRequest;
import com.dnaeasy.dnaeasy.dto.response.CommentReponse;
import com.dnaeasy.dnaeasy.dto.response.CommentReportResponse;
import com.dnaeasy.dnaeasy.dto.response.ManageCommentResponse;
import com.dnaeasy.dnaeasy.enity.*;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
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
        int appointmnet = apptRepo.countByService_ServiceIdAndCustomer_PersonIdAndCurentStatusAppointmentIsIn(serviceId, person.getPersonId(), stauts);
        int commnet = commentRepo.countByService_ServiceIdAndCustomer_PersonId(serviceId, person.getPersonId());
        return apptRepo.existsByCustomer_PersonIdAndService_ServiceIdAndCurentStatusAppointmentIsIn(person.getPersonId(), serviceId, stauts) && appointmnet > commnet;
    }

    @Override
    public Page<ManageCommentResponse> getALlForManageComment(SearchCommnentRequest request, Pageable pageable) {
        List<Appointment> appointmentList = apptRepo.findALLAppointmentHaveCommnent(request.getKeysearch());

        List<ManageCommentResponse> comments = new ArrayList<>();

        for (Appointment appointment : appointmentList) {
            for (int i = 0; i < appointment.getCustomer().getCommentList().size(); i++) {


                if (appointment.getService().getServiceId() == appointment.getCustomer().getCommentList().get(i).getService().getServiceId()) {
                    Comment comment = appointment.getCustomer().getCommentList().get(i);
                    ManageCommentResponse commentReponse = commentMapper.CommnetToManageCommentResponse(comment);
                    commentReponse.setEmailStaff_Test(appointment.getStaff().getEmail());
                    commentReponse.setNameStaff_Test(appointment.getStaff().getName());
                    commentReponse.setPhoneStaff_Test(appointment.getStaff().getPhone());
                    commentReponse.setAvatarUrlStaff_Test(appointment.getStaff().getAvatarUrl());
                    commentReponse.setEmailStaff_Lab(appointment.getSampelist().get(0).getResult().iterator().next().getStaff().getEmail());
                    commentReponse.setPhoneStaff_Lab(appointment.getSampelist().get(0).getResult().iterator().next().getStaff().getPhone());
                    commentReponse.setNameStaff_Lab(appointment.getSampelist().get(0).getResult().iterator().next().getStaff().getName());
                    commentReponse.setAvatarUrlStaff_Lab(appointment.getSampelist().get(0).getResult().iterator().next().getStaff().getAvatarUrl());
                    for (Payment p : appointment.getPayment()) {
                        if (p.getStaffReception() != null) {
                            if (!p.isExpense()) {
                                commentReponse.setNameStaff_Reception_Refund(p.getStaffReception().getName());
                                commentReponse.setEmailStaff_Reception_Refund(p.getStaffReception().getEmail());
                                commentReponse.setPhoneStaff_Reception_Refund(p.getStaffReception().getPhone());
                                commentReponse.setAvatarUrlStaff_ReceptionRefund(p.getStaffReception().getAvatarUrl());
                            } else {
                                commentReponse.setNameStaff_Reception(p.getStaffReception().getName());
                                commentReponse.setEmailStaff_Reception(p.getStaffReception().getEmail());
                                commentReponse.setPhoneStaff_Reception(p.getStaffReception().getPhone());
                                commentReponse.setAvatarUrlStaff_ReceptionRefund(p.getStaffReception().getAvatarUrl());
                            }
                        }
                    }
                    commentReponse.setServiceName(appointment.getService().getServiceName());
                    commentReponse.setDateCollected(appointment.getDateCollect());
                    commentReponse.setTypeCollect(appointment.getTypeCollect());
                    commentReponse.setAvatarUrl_Customer(appointment.getCustomer().getAvatarUrl());
                    comments.add(commentReponse);
                }

            }
        }

        List<ManageCommentResponse> commentResponses = comments;

        if (request.getStar() > 0) {
            comments = new ArrayList<>();
            for (int i = 0; i < commentResponses.size(); i++) {

                if (commentResponses.get(i).getRating() == request.getStar()) {
                    comments.add(commentResponses.get(i));

                }
            }
        }
        int pagesize = pageable.getPageSize();
        int start = pageable.getPageNumber() * pagesize;
        int end = Math.min(start + pagesize, comments.size());

        List<ManageCommentResponse> pagin = comments.subList(start, end);
        Page<ManageCommentResponse> pagemanage = new PageImpl<>(pagin, pageable, comments.size());

        return pagemanage;
    }

    @Override
    public CommentReportResponse getCommentReport() {
        Map<String, Integer> total = new HashMap<>();
        for (int i = 1; i <= 5; i++) {
            total.put(i + "sao", commentRepo.countByRating(i));
        }
        CommentReportResponse commentReportResponse = new CommentReportResponse();
        commentReportResponse.setComments(total);
        return commentReportResponse;
    }



}
