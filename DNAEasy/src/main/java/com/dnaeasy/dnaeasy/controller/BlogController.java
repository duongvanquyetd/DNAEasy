package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.BlogCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.BlogResponse;
import com.dnaeasy.dnaeasy.enity.BlogImage;
import com.dnaeasy.dnaeasy.service.impl.BlogService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("api/blog")
public class BlogController {
    @Autowired
    BlogService blogService;
    @Autowired
    CloudinaryUtil cloudinaryUtil;
    @PostMapping("/getAllBlog")
    public ResponseEntity<List<BlogResponse>> getAll()
    {
        return ResponseEntity.ok(blogService.getAllBlog());
    }
    @PostMapping("/createblog")
    public ResponseEntity<BlogResponse> createBlog(
            @RequestPart("blog")BlogCreateRequest blogCreateRequest,
            @RequestPart("file") List<MultipartFile> img
    ) throws IOException {



        List<BlogImage> list = new ArrayList<BlogImage>();
        for(MultipartFile file : img)
        {

            BlogImage blogImage = new BlogImage();
            blogImage.setBlogImageName(file.getOriginalFilename());
            blogImage.setBlogImagePath(cloudinaryUtil.uploadImage(file));
            list.add(blogImage);
        }
     blogCreateRequest.setBlogImages(list);
//        System.out.println("List image size: " + list.size());
//        System.out.println("Test image created"+blogCreateRequest.getBlogImages());
        return ResponseEntity.ok(blogService.CreateBlog(blogCreateRequest));
    }
    @PostMapping("/updateBlog/{id}")
    public ResponseEntity<BlogResponse> Update(
            @PathVariable("id") int id ,
            @RequestPart("blog") BlogCreateRequest blogCreateRequest,
            @RequestPart("file") List<MultipartFile> img
    ) throws IOException {



        List<BlogImage> list = new ArrayList<BlogImage>();
        for(MultipartFile file : img)
        {

            BlogImage blogImage = new BlogImage();
            blogImage.setBlogImageName(file.getOriginalFilename());
            blogImage.setBlogImagePath(cloudinaryUtil.uploadImage(file));
            list.add(blogImage);
        }
        blogCreateRequest.setBlogImages(list);
//        System.out.println("List image size: " + list.size());
//        System.out.println("Test image created"+blogCreateRequest.getBlogImages());
        return ResponseEntity.ok(blogService.UpdateBlog(id,blogCreateRequest));
    }
    @GetMapping("/approve/{id}")
    public ResponseEntity<?> ApproveBlog(@PathVariable("id") int blogid) {

        return ResponseEntity.ok(blogService.ApproveBlog(blogid));
    }
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> DeleteeBlog(@PathVariable("id") int blogid) {
            blogService.DeleteBlog(blogid);
        return ResponseEntity.ok("Deleted blog");
    }
    @GetMapping("/find")
    public ResponseEntity<List<BlogResponse>> findBlog(@RequestBody String keyword) {
        return  ResponseEntity.ok(blogService.findbyNameAndType(keyword));
    }
}
