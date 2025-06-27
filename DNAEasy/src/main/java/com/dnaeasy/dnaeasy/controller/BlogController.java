package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.BlogCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.SearchRequest;
import com.dnaeasy.dnaeasy.dto.response.BlogResponse;
import com.dnaeasy.dnaeasy.dto.response.ManageBlogResponse;
import com.dnaeasy.dnaeasy.service.impl.BlogService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/blog")
public class BlogController {
    @Autowired
    BlogService blogService;
    @Autowired
    CloudinaryUtil cloudinaryUtil;

    @GetMapping()
    public ResponseEntity<List<BlogResponse>> getAll() {
        return ResponseEntity.ok(blogService.getAllBlog());
    }

    @PostMapping("/create")
    public ResponseEntity<BlogResponse> createBlog(
            @RequestPart("blog") BlogCreateRequest blogCreateRequest,
            @RequestPart("file") List<MultipartFile> img
    ) {


        return ResponseEntity.ok(blogService.CreateBlog(blogCreateRequest, img));
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<BlogResponse> Update(
            @PathVariable("id") int id,
            @RequestPart("blog") BlogCreateRequest blogCreateRequest,
            @RequestPart(value = "file", required = false) List<MultipartFile> img,
            @RequestPart(value = "removeimg", required = false) List<String> removeimg
    ) {


        return ResponseEntity.ok(blogService.UpdateBlog(id, blogCreateRequest, img, removeimg));
    }

    @GetMapping("/active/{id}")
    public ResponseEntity<?> ApproveBlog(@PathVariable("id") int blogid) {

        return ResponseEntity.ok(blogService.ApproveBlog(blogid));
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<?> DeleteeBlog(@PathVariable("id") int blogid) {
        blogService.DeleteBlog(blogid);
        return ResponseEntity.ok("Deleted blog");
    }

    @PostMapping("/find")
    public ResponseEntity<Page<BlogResponse>> findBlog(@RequestParam("page") int page,
                                                       @RequestParam("size") int size,
                                                       @RequestBody SearchRequest request,
                                                       @RequestParam("active") boolean active,
                                                       @RequestParam("sortcolumn") String sortColumn,
                                                       @RequestParam("sortmode") String sortmode

    ) {
        Pageable pageable1 = PageRequest.of(page - 1, size);
        if(!sortColumn.equals("null"))
        {
            if(sortmode.equals("asc"))
            {
                pageable1 = PageRequest.of(page - 1, size, Sort.by(sortColumn).ascending());
            }
            else {
                pageable1 = PageRequest.of(page - 1, size, Sort.by(sortColumn).descending());
            }
        }


        return ResponseEntity.ok(blogService.findbyNameAndType(request, pageable1, active));
    }

    @GetMapping("{id}")
    public ResponseEntity<BlogResponse> getBlogById(@PathVariable("id") int id) {
        return ResponseEntity.ok(blogService.getBlogByID(id));
    }

    @GetMapping("/report")
    public ResponseEntity<ManageBlogResponse> response() {

        return ResponseEntity.ok(blogService.ManageBlogReport());
    }

}
