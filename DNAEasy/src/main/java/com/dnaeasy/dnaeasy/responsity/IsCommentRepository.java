package com.dnaeasy.dnaeasy.responsity;

import com.dnaeasy.dnaeasy.enity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IsCommentRepository extends JpaRepository<Comment, Integer> {
    @Query("""
        SELECT c
        FROM Comment c
        JOIN FETCH c.customer
        JOIN FETCH c.service
        WHERE c.commentId = :id
    """)
    Optional<Comment> findByIdWithCustomerAndService(@Param("id") Integer id);


    @Query("""
        SELECT c
        FROM Comment c
        JOIN FETCH c.customer
        JOIN FETCH c.service
        WHERE c.service.serviceId = :serviceId
    """)
    List<Comment> findAllByServiceIdWithCustomerAndService(@Param("serviceId") Integer serviceId);

    List<Comment> findByService_ServiceId(int serviceServiceId);

    Comment findByCommentId(int commentId);
}