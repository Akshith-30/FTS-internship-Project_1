package com.fts.e_commerce.controller;

import com.fts.e_commerce.entity.Product;
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
@CrossOrigin(origins = {"http://localhost:5555"})
@RequiredArgsConstructor
@Slf4j
public class EcommerceController {

    private final EcommerceService ecommerceService;

    // ======================== User APIs ========================

    @PostMapping("/register-user")
    public ResponseEntity<String> registerUserDetails(@RequestBody UserEntity userEntity) throws Exception {
        try {
            ecommerceService.registerUserDetails(userEntity);
            return ResponseEntity.ok("User registered successfully.");
        } catch (Exception e) {
            log.error("Error occurred while registering user: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Registration failed: " + e.getMessage());
        }
    }

    @GetMapping("/search/user")
    public ResponseEntity<List<UserEntity>> searchUserDetails(@RequestParam String searchString) {
        try {
            List<UserEntity> users = ecommerceService.searchUserDetails(searchString);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            log.error("Error searching users: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserEntity> getUserDetailsById(@PathVariable Integer id) {
        try {
            UserEntity user = ecommerceService.getUserDetailsById(id);
            return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error fetching user with ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ======================== Product APIs ========================

    @PostMapping("/product")
    public ResponseEntity<String> saveProduct(@RequestBody Product product) {
        try {
            ecommerceService.saveProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body("Product saved successfully.");
        } catch (Exception e) {
            log.error("Error saving product: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save product: " + e.getMessage());
        }
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            List<Product> products = ecommerceService.getAllProducts();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            log.error("Error fetching products: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Integer id, @RequestBody Product updatedProduct) {
        try {
            ecommerceService.updateProduct(Long.valueOf(id), updatedProduct);
            return ResponseEntity.ok("Product updated successfully.");
        } catch (RuntimeException e) {
            log.error("Product not found with ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            log.error("Error updating product ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update product: " + e.getMessage());
        }
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        try {
            log.info("Attempting to delete product with ID: {}", id);
            ecommerceService.deleteProduct(Long.valueOf(id));
            return ResponseEntity.ok("Product deleted successfully.");
        } catch (RuntimeException e) {
            log.error("Product not found with ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            log.error("Error deleting product ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete product: " + e.getMessage());
        }
    }
}