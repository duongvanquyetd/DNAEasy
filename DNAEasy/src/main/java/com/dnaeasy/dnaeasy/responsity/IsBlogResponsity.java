package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Blog;
import com.dnaeasy.dnaeasy.enity.BlogImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IsBlogResponsity extends JpaRepository<Blog, Integer>
{
    @Query("Select b from Blog b where b.blogTitle like CONCAT('%', :keyword, '%') or b.blogType like CONCAT('%', :keyword, '%')")

    Page<Blog> findByBlogType(String keyword,Pageable pageable);

    Page<Blog> findByBlogTitleContainsIgnoreCaseAndBlogTypeContainingIgnoreCase(String blogTitle, String blogType,Pageable pageable);

    Page<Blog> findByBlogTitleContainsIgnoreCase(String blogTitle, Pageable pageable);

    Page<Blog> findByBlogTitleContainsIgnoreCaseAndBlogTypeContainingIgnoreCaseAndActive(String blogTitle, String blogType, boolean active, Pageable pageable);

    Page<Blog> findByBlogTypeAndActive(String blogType, boolean active, Pageable pageable);

    Page<Blog> findByBlogTitleContainsIgnoreCaseAndActive(String blogTitle, boolean active, Pageable pageable);

    Page<Blog> findAllByActive(boolean active, Pageable pageable);

    long countByActive(boolean active);



    double countByBlogTitle(String blogTitle);


}
