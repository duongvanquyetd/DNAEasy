package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.CommentRequest;
import com.dnaeasy.dnaeasy.dto.response.CommentReponse;
import com.dnaeasy.dnaeasy.dto.response.ManageCommentResponse;
import com.dnaeasy.dnaeasy.enity.Comment;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.enity.Service;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-03T20:07:20+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Microsoft)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Override
    public Comment toEntity(CommentRequest dto) {
        if ( dto == null ) {
            return null;
        }

        Comment comment = new Comment();

        comment.setCommentContent( dto.getCommentContent() );
        if ( dto.getRating() != null ) {
            comment.setRating( dto.getRating() );
        }

        setCommentDateNow( comment );

        return comment;
    }

    @Override
    public CommentReponse toResponseDto(Comment entity) {
        if ( entity == null ) {
            return null;
        }

        CommentReponse.CommentReponseBuilder commentReponse = CommentReponse.builder();

        commentReponse.avatarUrl( entityCustomerAvatarUrl( entity ) );
        commentReponse.name( entityCustomerName( entity ) );
        commentReponse.commentId( entity.getCommentId() );
        commentReponse.commentContent( entity.getCommentContent() );
        commentReponse.commentDate( entity.getCommentDate() );
        commentReponse.rating( entity.getRating() );

        commentReponse.imgUrls( getImgUrls(entity) );

        return commentReponse.build();
    }

    @Override
    public ManageCommentResponse CommnetToManageCommentResponse(Comment comment) {
        if ( comment == null ) {
            return null;
        }

        ManageCommentResponse manageCommentResponse = new ManageCommentResponse();

        manageCommentResponse.setPhoneCustomer( commentCustomerPhone( comment ) );
        manageCommentResponse.setEmailCustomer( commentCustomerEmail( comment ) );
        manageCommentResponse.setNameCustomer( entityCustomerName( comment ) );
        manageCommentResponse.setServiceName( commentServiceServiceName( comment ) );
        manageCommentResponse.setServiceType( commentServiceTypeService( comment ) );
        manageCommentResponse.setCommentContent( comment.getCommentContent() );
        manageCommentResponse.setRating( comment.getRating() );
        manageCommentResponse.setCommentDate( comment.getCommentDate() );

        return manageCommentResponse;
    }

    private String entityCustomerAvatarUrl(Comment comment) {
        if ( comment == null ) {
            return null;
        }
        Person customer = comment.getCustomer();
        if ( customer == null ) {
            return null;
        }
        String avatarUrl = customer.getAvatarUrl();
        if ( avatarUrl == null ) {
            return null;
        }
        return avatarUrl;
    }

    private String entityCustomerName(Comment comment) {
        if ( comment == null ) {
            return null;
        }
        Person customer = comment.getCustomer();
        if ( customer == null ) {
            return null;
        }
        String name = customer.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    private String commentCustomerPhone(Comment comment) {
        if ( comment == null ) {
            return null;
        }
        Person customer = comment.getCustomer();
        if ( customer == null ) {
            return null;
        }
        String phone = customer.getPhone();
        if ( phone == null ) {
            return null;
        }
        return phone;
    }

    private String commentCustomerEmail(Comment comment) {
        if ( comment == null ) {
            return null;
        }
        Person customer = comment.getCustomer();
        if ( customer == null ) {
            return null;
        }
        String email = customer.getEmail();
        if ( email == null ) {
            return null;
        }
        return email;
    }

    private String commentServiceServiceName(Comment comment) {
        if ( comment == null ) {
            return null;
        }
        Service service = comment.getService();
        if ( service == null ) {
            return null;
        }
        String serviceName = service.getServiceName();
        if ( serviceName == null ) {
            return null;
        }
        return serviceName;
    }

    private String commentServiceTypeService(Comment comment) {
        if ( comment == null ) {
            return null;
        }
        Service service = comment.getService();
        if ( service == null ) {
            return null;
        }
        String typeService = service.getTypeService();
        if ( typeService == null ) {
            return null;
        }
        return typeService;
    }
}
