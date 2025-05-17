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
@RequiredArgsConstructor
@Slf4j
public class EcommerceController {

    private final EcommerceService ecommerceService;

    // User APIs

    @PostMapping("/register-user")
    public ResponseEntity<String> registerUserDetails(@RequestBody UserEntity userEntity) throws Exception {
        try {
            ecommerceService.registerUserDetails(userEntity);
            return ResponseEntity.ok("User registered successfully.");
        } catch (Exception e) {
            log.error("error occured in register user", e);
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

    // Product APIs

    @PostMapping("/product")
    public ResponseEntity<String> saveProduct(@RequestBody Product product) {
        ecommerceService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body("Product saved successfully.");
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        ecommerceService.updateProduct(id, updatedProduct);
        return ResponseEntity.ok("Product updated successfully.");
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        ecommerceService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully.");
    }
}
