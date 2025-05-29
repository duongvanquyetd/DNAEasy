package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.BlogCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.BlogResponse;

import java.util.List;

public interface IsBlogService {

    List<BlogResponse> getAllBlog();

    BlogResponse CreateBlog(BlogCreateRequest blogCreateRequest);

    BlogResponse UpdateBlog(int blogid,BlogCreateRequest blogCreateRequest);

    String ApproveBlog(int blogid);
    void DeleteBlog(int blogid);
    List<BlogResponse> findbyNameAndType(String keyword);
}
