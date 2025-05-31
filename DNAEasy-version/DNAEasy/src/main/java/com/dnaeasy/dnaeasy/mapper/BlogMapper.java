package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.BlogCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.BlogResponse;
import com.dnaeasy.dnaeasy.enity.Blog;
import com.dnaeasy.dnaeasy.enity.BlogImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface BlogMapper {
    @Mapping(target = "blogimage", expression = "java(BlogimagetoString(blog))")
    @Mapping(target = "staffName",source = "staff.name")
    BlogResponse BlogToBlogResponse(Blog blog);

    Blog BlogCreateRequestToBlog(BlogCreateRequest blogCreateRequest);



    default List<String> BlogimagetoString(Blog blog) {
        List<String> blogimage = new ArrayList<>();
        List<BlogImage> blogImageList = blog.getBlogImages();
        if (!blogImageList.isEmpty()) {
            blogImageList.forEach(image -> {
                blogimage.add(image.getBlogImagePath());
            });
        }
        return blogimage;
    }
}
