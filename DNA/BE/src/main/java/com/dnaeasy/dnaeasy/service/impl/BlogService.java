package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.BlogCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.SearchRequest;
import com.dnaeasy.dnaeasy.dto.response.BlogResponse;
import com.dnaeasy.dnaeasy.dto.response.ManageBlogResponse;
import com.dnaeasy.dnaeasy.enity.Blog;
import com.dnaeasy.dnaeasy.enity.BlogImage;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.exception.BadRequestException;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.mapper.BlogMapper;
import com.dnaeasy.dnaeasy.responsity.IsBlogImageResponsity;
import com.dnaeasy.dnaeasy.responsity.IsBlogResponsity;
import com.dnaeasy.dnaeasy.responsity.IsUserResponsity;
import com.dnaeasy.dnaeasy.service.IsBlogService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BlogService implements IsBlogService {
    @Autowired
    IsBlogImageResponsity isBlogImageResponsity;
    @Autowired
    IsBlogResponsity isBlogResponsity;
    @Autowired
    BlogMapper blogMapper;
    @Autowired
    IsUserResponsity userResponsity;
    @Autowired
    CloudinaryUtil cloudinaryUtil;

    @Override
    public List<BlogResponse> getAllBlog() {
        List<Blog> blogList = isBlogResponsity.findAll();
        List<BlogResponse> blogResponseList = new ArrayList<>();
        for (Blog blog : blogList) {
            BlogResponse blogResponse = blogMapper.BlogToBlogResponse(blog);


            blogResponseList.add(blogResponse);
        }
        return blogResponseList;
    }

    @Override
    public BlogResponse CreateBlog(BlogCreateRequest blogCreateRequest, List<MultipartFile> files) {


        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        Person person = userResponsity.findByUsername(name);
        Blog b = blogMapper.BlogCreateRequestToBlog(blogCreateRequest);

            if (isBlogResponsity.countByBlogTitle(b.getBlogTitle()) > 0) {
                throw new BadRequestException("Blog Title already exist");
            }

        if (files != null && !files.isEmpty()) {
            try {
                List<BlogImage> list = new ArrayList<>();
                for (MultipartFile file : files) {
                    BlogImage blogImage = new BlogImage();
                    blogImage.setBlog(b);
                    blogImage.setBlogImagePath(cloudinaryUtil.uploadImage(file));
                    blogImage.setBlogImageName(file.getOriginalFilename());
                    list.add(blogImage);
                }
                b.getBlogImages().addAll(list);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        b.setStaff(person);
        b.setCreateDate(LocalDateTime.now());


        return blogMapper.BlogToBlogResponse(isBlogResponsity.save(b));
    }

    @Override
    public BlogResponse UpdateBlog(int blogid, BlogCreateRequest blogCreateRequest, List<MultipartFile> files, List<String> removeimg) {
        Blog b = isBlogResponsity.findById(blogid).orElseThrow(() -> new ResourceNotFound("Blog id not found" + blogid));


        if (!b.getBlogTitle().equals(blogCreateRequest.getBlogTitle())) {
            if (isBlogResponsity.countByBlogTitle(blogCreateRequest.getBlogTitle()) > 0) {
                throw new BadRequestException("Blog Title already exist");
            }
        }

        if (removeimg.size() > 0) {

            for (String rim : removeimg) {
                for (int i = 0; i < b.getBlogImages().size(); i++) {


                    if (rim.equals(b.getBlogImages().get(i).getBlogImagePath())) {
                        b.getBlogImages().remove(i);
                    }
                }
            }

        }
        if (files != null && !files.isEmpty()) {
            try {
                List<BlogImage> list = new ArrayList<>();
                for (MultipartFile file : files) {
                    BlogImage blogImage = new BlogImage();
                    blogImage.setBlog(b);
                    blogImage.setBlogImagePath(cloudinaryUtil.uploadImage(file));
                    blogImage.setBlogImageName(file.getOriginalFilename());
                    list.add(blogImage);
                }
                b.getBlogImages().addAll(list);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }


        b.setBlogType(blogCreateRequest.getBlogType());
        b.setBlogContent(blogCreateRequest.getBlogContent());
        b.setBlogTitle(blogCreateRequest.getBlogTitle());


        isBlogResponsity.save(b);
        return blogMapper.BlogToBlogResponse(b);
    }

    @Override
    public String active(int blogid) {
        Blog b = isBlogResponsity.findById(blogid).orElseThrow(() -> new ResourceNotFound("Blog id not found" + blogid));
        b.setActive(true);
        isBlogResponsity.save(b);
        return "active";
    }

    @Override
    public void inactive(int blogid) {
        Blog blog = isBlogResponsity.findById(blogid).orElseThrow(() -> new ResourceNotFound("Blog id not found" + blogid));
        blog.setActive(false);
        isBlogResponsity.save(blog);
    }

    @Override
    public Page<BlogResponse> findbyNameAndType(SearchRequest request, Pageable page, boolean active) {


        Page<Blog> blogList = null;

        if (!request.getKeywordType().trim().isEmpty() && !request.getKeywordSearch().trim().isEmpty()) {
            blogList = isBlogResponsity.findByBlogTitleContainsIgnoreCaseAndBlogTypeContainingIgnoreCaseAndActive(request.getKeywordSearch(), request.getKeywordType(), active, page);
        } else if (request.getKeywordSearch().trim().isEmpty() && !request.getKeywordType().trim().isEmpty()) {
            blogList = isBlogResponsity.findByBlogTypeAndActive(request.getKeywordType(), active, page);
        } else if (!request.getKeywordSearch().trim().isEmpty() && request.getKeywordType().trim().isEmpty()) {
            blogList = isBlogResponsity.findByBlogTitleContainsIgnoreCaseAndActive(request.getKeywordSearch(), active, page);
        } else {
            blogList = isBlogResponsity.findAllByActive(active, page);
        }
        return blogList.map(blogMapper::BlogToBlogResponse);
    }

    @Override
    public BlogResponse getBlogByID(int id) {

        Blog b = isBlogResponsity.findById(id).orElseThrow(() -> new ResourceNotFound("Blog id not found" + id));

        return blogMapper.BlogToBlogResponse(b);

    }

    @Override
    public ManageBlogResponse ManageBlogReport() {

        ManageBlogResponse mn = new ManageBlogResponse();
        mn.setTotalblogActive(isBlogResponsity.countByActive(true));
        mn.setTotalblogInactive(isBlogResponsity.countByActive(false));
        return mn;
    }

    @Override
    public List<String> listtypeBlog() {

        List<String> type = new ArrayList<>();
        List<Blog> blogList  = isBlogResponsity.findAll();
        for (Blog blog : blogList) {

            if(!type.contains(blog.getBlogType()) && blog.isActive()) {
                type.add(blog.getBlogType());
            }

        }
        return type;
    }

}
