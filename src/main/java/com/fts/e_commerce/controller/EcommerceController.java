package com.fts.e_commerce.controller;

import com.fts.e_commerce.entity.UserEntity;
import com.fts.e_commerce.service.EcommerceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class EcommerceController {

    private final EcommerceService ecommerceService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUserDetails(@RequestBody UserEntity userEntity) throws Exception {
        try {
            ecommerceService.registerUserDetails(userEntity);
            return ResponseEntity.ok("User registered successfully.");
        } catch (Exception e) {
            log.error("Error occurred in register user", e);
            throw new Exception("Failed to register user");
        }
    }

    @GetMapping("/search")
    public List<UserEntity> searchUserDetails(@RequestParam String searchString) throws Exception {
        try {
            return ecommerceService.searchUserDetails(searchString);
        } catch (Exception e) {
            throw new Exception("Failed to search user");
        }
    }

    @GetMapping("/{id}")
    public UserEntity getUserDetailsById(@PathVariable Integer id) throws Exception {
        try {
            return ecommerceService.getUserDetailsById(id);
        } catch (Exception e) {
            throw new Exception("Failed to get user by id");
        }
    }
}
