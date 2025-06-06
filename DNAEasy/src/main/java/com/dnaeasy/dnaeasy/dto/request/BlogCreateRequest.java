package com.dnaeasy.dnaeasy.dto.request;

import com.dnaeasy.dnaeasy.enity.BlogImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogCreateRequest {

    private String blogTitle;
    private String blogContent;
    private String blogType;
    List<BlogImage> blogImages;
}
