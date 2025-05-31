package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Blog;
import com.dnaeasy.dnaeasy.enity.BlogImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IsBlogResponsity extends JpaRepository<Blog, Integer>
{
    @Query("Select b from Blog b where b.blogTitle like CONCAT('%', :keyword, '%') or b.blogType like CONCAT('%', :keyword, '%')")
    List<Blog> findByNameOrBlogType(String keyword);
}
