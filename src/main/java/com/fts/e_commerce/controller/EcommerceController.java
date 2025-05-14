package com.fts.e_commerce.controller;

import com.fts.e_commerce.entity.UserEntity;
import com.fts.e_commerce.service.EcommerceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EcommerceController {

    private final EcommerceService ecommerceService;


    @PostMapping("/register-user")
    public ResponseEntity<String> registerUserDetails(@RequestBody UserEntity userEntity) {
        try {
            ecommerceService.registerUserDetails(userEntity);
            return ResponseEntity.ok("User registered successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed: " + e.getMessage());
        }
    }
}
