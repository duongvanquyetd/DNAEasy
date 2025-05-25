package com.dnaeasy.dnaeasy.enity;

import com.dnaeasy.dnaeasy.enums.BlogStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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

    @ManyToOne
    @JoinColumn(name="staff_id")
    private Person staff;

    @OneToMany(mappedBy = "blog",cascade = CascadeType.ALL, orphanRemoval = true)
   private  List<BlogImage> blogImages = new ArrayList<>();
}
