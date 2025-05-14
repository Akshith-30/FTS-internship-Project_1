package com.fts.e_commerce.entity;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Entity
@Table(name = "t_e_com_users")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserEntityDummy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String password;
    private String address;
    private String phone;
    private Date dob;
    private String gender;
    private String state;
}
