package com.dnaeasy.dnaeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentReponse {

    private Integer commentId;
    private String commentContent;
    private LocalDateTime commentDate;
    private Integer rating;
    private String avatarUrl;
    private String name;
    List<String> imgUrls;
}
