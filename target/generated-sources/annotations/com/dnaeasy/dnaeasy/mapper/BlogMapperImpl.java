package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.BlogCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.BlogResponse;
import com.dnaeasy.dnaeasy.enity.Blog;
import com.dnaeasy.dnaeasy.enity.Person;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-03T20:07:21+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Microsoft)"
)
@Component
public class BlogMapperImpl implements BlogMapper {

    @Override
    public BlogResponse BlogToBlogResponse(Blog blog) {
        if ( blog == null ) {
            return null;
        }

        BlogResponse.BlogResponseBuilder blogResponse = BlogResponse.builder();

        blogResponse.author( blogStaffName( blog ) );
        blogResponse.blogId( blog.getBlogId() );
        blogResponse.blogTitle( blog.getBlogTitle() );
        blogResponse.blogContent( blog.getBlogContent() );
        blogResponse.blogType( blog.getBlogType() );
        blogResponse.createDate( blog.getCreateDate() );
        blogResponse.active( blog.isActive() );

        blogResponse.blogimage( BlogimagetoString(blog) );

        return blogResponse.build();
    }

    @Override
    public Blog BlogCreateRequestToBlog(BlogCreateRequest blogCreateRequest) {
        if ( blogCreateRequest == null ) {
            return null;
        }

        Blog blog = new Blog();

        blog.setBlogTitle( blogCreateRequest.getBlogTitle() );
        blog.setBlogContent( blogCreateRequest.getBlogContent() );
        blog.setBlogType( blogCreateRequest.getBlogType() );

        return blog;
    }

    private String blogStaffName(Blog blog) {
        if ( blog == null ) {
            return null;
        }
        Person staff = blog.getStaff();
        if ( staff == null ) {
            return null;
        }
        String name = staff.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }
}
