package com.fts.e_commerce.controller;

import com.fts.e_commerce.entity.UserEntity;
import com.fts.e_commerce.service.EcommerceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000") // Change this to your frontend origin or "*" for all origins
public class EcommerceController {

    private final EcommerceService ecommerceService;

    // Register User - matches frontend fetch URL /api/register-user
    @PostMapping("/register-user")
    public ResponseEntity<?> registerUserDetails(@RequestBody UserEntity userEntity) {
        try {
            ecommerceService.registerUserDetails(userEntity);
            return ResponseEntity.ok("User registered successfully.");
        } catch (Exception e) {
            log.error("Error occurred during user registration", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to register user: " + e.getMessage());
        }
    }

    // Search users by search string
    @GetMapping("/user/search")
    public ResponseEntity<?> searchUserDetails(@RequestParam String searchString) {
        try {
            List<UserEntity> users = ecommerceService.searchUserDetails(searchString);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            log.error("Error occurred during user search", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to search user: " + e.getMessage());
        }
    }

    // Get user by ID
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserDetailsById(@PathVariable Integer id) {
        try {
            UserEntity user = ecommerceService.getUserDetailsById(id);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id: " + id);
            }
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error("Error occurred getting user by id", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to get user by id: " + e.getMessage());
        }
    }
}
