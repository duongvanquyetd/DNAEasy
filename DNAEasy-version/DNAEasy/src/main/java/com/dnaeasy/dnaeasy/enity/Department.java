//package com.dnaeasy.dnaeasy.enity;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//@Entity
//@Table(name="Department")
//public class Department {
//    @Id
//    private String departmentId;
//    @Column(name = "department_Name")
//    private String departmentName;
//    @OneToMany(mappedBy = "department",cascade = CascadeType.ALL,orphanRemoval = true)
//     private List<Person> persons = new ArrayList<>();
//}
