package com.fts.e_commerce.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private String fullName;
    private String email;
    private String password;
    private String address;
    private String phone;
    private Date dob;
    private String gender;
    private String state;


}
