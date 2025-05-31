package com.dnaeasy.dnaeasy.enity;

import com.dnaeasy.dnaeasy.enums.BlogStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Blog")
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int blogId;
    private String blogTitle;
    @Lob
    private String blogContent;

    private boolean blogStatus;
    private String blogType;
    private LocalDateTime createDate;
    @ManyToOne
    @JoinColumn(name="staff_id")
    private Person staff;

    @OneToMany(mappedBy = "blog",cascade = CascadeType.ALL, orphanRemoval = true)
   private  List<BlogImage> blogImages = new ArrayList<>();
}
