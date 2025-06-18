package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Blog;
import com.dnaeasy.dnaeasy.enity.BlogImage;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IsBlogResponsity extends JpaRepository<Blog, Integer>
{
    @Query("Select b from Blog b where b.blogTitle like CONCAT('%', :keyword, '%') or b.blogType like CONCAT('%', :keyword, '%')")
    List<Blog> findByNameOrBlogType(String keyword);




    List<Blog> findByBlogTitleOrBlogType(String blogTitle, String blogType);

    List<Blog> findByBlogTitle(String blogTitle);

    List<Blog> findByBlogType(String blogType);

    List<Blog> findByBlogTitleContains(String blogTitle);

    List<Blog> findByBlogTitleContainsIgnoreCase(String blogTitle);

    List<Blog> findByBlogTypeContainingIgnoreCase(String blogType);

    List<Blog> findByBlogTitleContainsIgnoreCaseOrBlogTypeContainingIgnoreCase(String blogTitle, String blogType);

    List<Blog> findByBlogTitleContainsIgnoreCaseAndBlogTypeContainingIgnoreCase(String blogTitle, String blogType, Sort sort);

    List<Blog> findByBlogTitleContainsIgnoreCaseAndBlogTypeContainingIgnoreCase(String blogTitle, String blogType);
}
