package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.CommentRequest;
import com.dnaeasy.dnaeasy.dto.response.CommentReponse;
import com.dnaeasy.dnaeasy.dto.response.ServiceResponse;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.service.IsCommentService;
import com.dnaeasy.dnaeasy.service.IsPersonService;
import com.dnaeasy.dnaeasy.service.impl.CommentService;
import com.dnaeasy.dnaeasy.service.impl.IsServiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/comment")
@RequiredArgsConstructor

public class CommentMvcController {
    private final IsServiceService serviceService;
    private final IsCommentService commentService;
    private final IsPersonService personService;

    @GetMapping("/{id}")
    public String showServiceDetail(
            @PathVariable("id") int id,
            Model model){

        ServiceResponse serviceDto = serviceService.getById(Long.valueOf(id));

        List<CommentReponse> commentList = commentService.getCommentsByServiceId(id);

        CommentRequest newCommentDto = CommentRequest.builder()
                .serviceId(id)       // ← Không ép xuống int nữa
                .build();
        model.addAttribute("service", serviceDto);
        model.addAttribute("commentList", commentList);
        model.addAttribute("newCommentDto", newCommentDto);
        return "service-detail";
    }

    @PostMapping("/{id}/comments")
    public String postNewComment(@PathVariable("id") Long id,
                                 @Valid @ModelAttribute("newCommentDto") CommentRequest newCommentDto,
                                 BindingResult bindingResult,
                                 @AuthenticationPrincipal org.springframework.security.core.userdetails.User authUser,
                                 Model model
    ){
        if(bindingResult.hasErrors()){
            ServiceResponse serviceDto = serviceService.getById(id);
            List<CommentReponse> commetList = commentService.getCommentsByServiceId(id.intValue());
            model.addAttribute("service", serviceDto);
            model.addAttribute("commentList", commetList);
            return "service-detail";
        }
        // lay user hien tai
        Person currentUser = personService.findByUsername(authUser.getUsername())
                .orElseThrow(() -> new RuntimeException(
                        "kko tim thay person" + authUser.getUsername()));
        newCommentDto.setCustomerId(currentUser.getPersonId());
        newCommentDto.setServiceId(Math.toIntExact(id));

        commentService.createComment(newCommentDto);
        return "redirect:/comment" + id;
    }

}
