package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.BlogCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.SearchRequest;
import com.dnaeasy.dnaeasy.dto.response.BlogResponse;
import com.dnaeasy.dnaeasy.enity.Blog;
import com.dnaeasy.dnaeasy.enity.BlogImage;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.mapper.BlogMapper;
import com.dnaeasy.dnaeasy.responsity.IsBlogImageResponsity;
import com.dnaeasy.dnaeasy.responsity.IsBlogResponsity;
import com.dnaeasy.dnaeasy.responsity.IsUserResponsity;
import com.dnaeasy.dnaeasy.service.IsBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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
    public BlogResponse CreateBlog(BlogCreateRequest blogCreateRequest) {


        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        Person person = userResponsity.findByUsername(name);
        Blog b = blogMapper.BlogCreateRequestToBlog(blogCreateRequest);
        System.out.println("Created blog: " + b.getBlogImages());
        for (BlogImage img : b.getBlogImages()) {

            img.setBlog(b);
        }
        b.setStaff(person);
        b.setBlogStatus(false);
        b.setCreateDate(LocalDateTime.now());


        Blog blogsave = isBlogResponsity.save(b);
        System.out.println(blogsave.getBlogImages());


        return blogMapper.BlogToBlogResponse(blogsave);
    }

    @Override
    public BlogResponse UpdateBlog(int blogid, BlogCreateRequest blogCreateRequest) {
        Blog b = isBlogResponsity.findById(blogid).orElseThrow(() -> new ResourceNotFound("Blog id not found" + blogid));


        // hiên tại đang làm update là sẽ xóa hết tất cả các ảnh cũ đi và thêm tất cả ảnh mới vào
        // nếu lam xong sớm tôi muốn làm hiện tất cả ảnh lên và chọn xóa ảnh và thêm ảnh thì vao đây sẽ xem ảnh nào có trong database mà không có trong list image mới thi xóa ảnh đó trong database

        //       isBlogImageResponsity.deleteByBlog(b.getBlogId());

        for (BlogImage img : blogCreateRequest.getBlogImages()) {
            img.setBlog(b);
        }
        // vi dang sai   orphanRemoval = true nen khi ma list con thay doi thi database cung se thay doi theo nen ta phai lay list hien tai ra va thay doi tren list do neu them list moi vao se vi loi
        b.getBlogImages().clear();
        b.getBlogImages().addAll(blogCreateRequest.getBlogImages());
        b.setBlogContent(blogCreateRequest.getBlogContent());
        b.setBlogTitle(blogCreateRequest.getBlogTitle());

        isBlogResponsity.save(b);
        return blogMapper.BlogToBlogResponse(b);
    }

    @Override
    public String ApproveBlog(int blogid) {
        Blog b = isBlogResponsity.findById(blogid).orElseThrow(() -> new ResourceNotFound("Blog id not found" + blogid));
        b.setBlogStatus(true);
        isBlogResponsity.save(b);
        return "Approved";
    }

    @Override
    public void DeleteBlog(int blogid) {
        Blog blog = isBlogResponsity.findById(blogid).orElseThrow(() -> new ResourceNotFound("Blog id not found" + blogid));
        isBlogResponsity.delete(blog);
    }

    @Override
    public List<BlogResponse> findbyNameAndType(SearchRequest request) {


        List<Blog> blogList = new ArrayList<>();

        if (request.getKeywordType() != null && request.getKeywordSearch() != null) {
            blogList = isBlogResponsity.findByBlogTitleContainsIgnoreCaseAndBlogTypeContainingIgnoreCase(request.getKeywordSearch(), request.getKeywordType());
        } else if (request.getKeywordSearch() == null && request.getKeywordType() != null) {
            blogList = isBlogResponsity.findByBlogType(request.getKeywordType());
        } else if (request.getKeywordType() == null && request.getKeywordSearch() != null) {
            blogList = isBlogResponsity.findByBlogTitle(request.getKeywordSearch());
        }
        else {
            blogList = isBlogResponsity.findAll();
        }


        List<BlogResponse> blogResponseList = new ArrayList<>();
        blogList.forEach(blog -> {
            BlogResponse blogResponse = blogMapper.BlogToBlogResponse(blog);
            blogResponseList.add(blogResponse);
        });
        return blogResponseList;
    }

    @Override
    public BlogResponse getBlogByID(int id) {

        Blog b = isBlogResponsity.findById(id).orElseThrow(() -> new ResourceNotFound("Blog id not found" + id));

        return blogMapper.BlogToBlogResponse(b);

    }

}
