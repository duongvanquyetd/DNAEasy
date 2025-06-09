package com.dnaeasy.dnaeasy.enity;

import com.dnaeasy.dnaeasy.enums.ServiceType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
@Data
@Entity
@Table(name = "Service")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int serviceId;
    private int sample_count;
    private String serviceName;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String serviceDescription;
    @Column( precision = 19, scale = 2)
    private BigDecimal servicePrice;

    private String typeService;

    @OneToMany(mappedBy = "service",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ServiceImage> serviceImageList = new ArrayList<>();
    @OneToMany(mappedBy = "service",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Appointment> appointmentsList = new ArrayList<>();
    @OneToMany(mappedBy = "service")
    private List<Comment> comments = new ArrayList<>();


}
