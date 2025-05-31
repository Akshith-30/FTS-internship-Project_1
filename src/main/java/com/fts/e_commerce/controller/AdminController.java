package com.fts.e_commerce.controller;

import com.fts.e_commerce.entity.UserEntity;
import com.fts.e_commerce.service.AdminService;
import com.fts.e_commerce.service.EcommerceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AdminController {

    private final AdminService adminService;
    private final EcommerceService ecommerceService;

    public AdminController(AdminService adminService, EcommerceService ecommerceService) {
        this.adminService = adminService;
        this.ecommerceService = ecommerceService;
    }

    // Admin login endpoint
    @PostMapping("/admin/login")
    public ResponseEntity<String> adminLogin(@RequestBody Map<String, String> credentials) {
        String adminId = credentials.get("adminId");
        String password = credentials.get("password");
        if (adminService.validateAdmin(adminId, password)) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // User login endpoint
    @PostMapping("/auth/login")
    public ResponseEntity<?> userLogin(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email and password must be provided");
        }

        Optional<UserEntity> userOpt = ecommerceService.validateUser(email, password);

        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}
