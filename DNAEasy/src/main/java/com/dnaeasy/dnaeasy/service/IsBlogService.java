package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.BlogCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.SearchRequest;
import com.dnaeasy.dnaeasy.dto.response.BlogResponse;
import com.dnaeasy.dnaeasy.dto.response.ManageBlogResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IsBlogService {

    List<BlogResponse> getAllBlog();

    BlogResponse CreateBlog(BlogCreateRequest blogCreateRequest,List<MultipartFile> img);

    BlogResponse UpdateBlog(int blogid, BlogCreateRequest blogCreateRequest, List<MultipartFile> files, List<String> removeimg);

    String active(int blogid);
    void inactive(int blogid);
    Page<BlogResponse> findbyNameAndType(SearchRequest searchRequest, Pageable pageable,boolean active);
    BlogResponse getBlogByID(int id);
    ManageBlogResponse ManageBlogReport();
    List<String> listtypeBlog();

}
