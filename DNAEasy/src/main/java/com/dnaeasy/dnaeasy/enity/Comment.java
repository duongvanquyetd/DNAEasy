package com.dnaeasy.dnaeasy.enity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentId;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String commentContent;
    private int rating;
    private LocalDateTime commentDate;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Person customer;
    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;
    @OneToMany(mappedBy = "comment",cascade = CascadeType.ALL, orphanRemoval = true)

    private List<CommentImage> commentImages = new ArrayList<>();
}
