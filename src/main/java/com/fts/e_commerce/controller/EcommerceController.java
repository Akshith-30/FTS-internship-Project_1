package com.fts.e_commerce.controller;

import com.fts.e_commerce.entity.UserEntity;
import com.fts.e_commerce.service.EcommerceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EcommerceController {

    private final EcommerceService ecommerceService;


    @PostMapping("/register-user")
    public ResponseEntity<String> registerUserDetails(@RequestBody UserEntity userEntity) throws Exception {
        try {
            ecommerceService.registerUserDetails(userEntity);
            return ResponseEntity.ok("User registered successfully.");
        } catch (Exception e) {
            throw new Exception("test");
        }
    }

    @GetMapping("/search/user")
    public List<UserEntity> searchUserDetails(@RequestParam String searchString) throws Exception {
        try {
            return ecommerceService.searchUserDetails(searchString);
        } catch (Exception e) {
            throw new Exception("test");
        }
    }

    @GetMapping("/user/{id}")
    public UserEntity getUserDetailsById(@PathVariable Integer id) throws Exception {
        try {
            return ecommerceService.getUserDetailsById(id);
        } catch (Exception e) {
            throw new Exception("test");
        }
    }
}
