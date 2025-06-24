package com.dnaeasy.dnaeasy.dto.response;

import com.dnaeasy.dnaeasy.enity.Blog;
import com.dnaeasy.dnaeasy.enity.BlogImage;
import com.dnaeasy.dnaeasy.enity.Person;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class BlogResponse {
     private int blogId;
    private String blogTitle;

    private String blogContent;
    private String blogType;
    List<String> blogimage;
    private LocalDateTime createDate;
    private  boolean active;
}
