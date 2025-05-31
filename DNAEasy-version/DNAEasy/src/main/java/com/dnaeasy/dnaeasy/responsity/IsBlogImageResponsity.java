package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Blog;
import com.dnaeasy.dnaeasy.enity.BlogImage;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IsBlogImageResponsity extends JpaRepository<BlogImage, Integer> {
    @Query("Select bi from BlogImage bi where bi.blog.blogId = :blogID ")
    List<BlogImage> getBlogImageByBlogID(Integer blogID);
    @Modifying  // cần biết là bạn không thực hiện đọc SELECT mà là thay đổi
@Transactional  // BIẾT ĐỂ COMMIT CHỨ KHONG LÀ ROLLLBACK NGAY LẬP TỨC , CẦN UPDATE ,DELETE , INSERT
    @Query("Delete  BlogImage b where b.blog.blogId =:blogId ")
    void deleteByBlog(Integer blogId);
}
