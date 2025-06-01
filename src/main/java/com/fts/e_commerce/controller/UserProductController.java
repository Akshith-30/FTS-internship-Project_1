package com.fts.e_commerce.controller;

import com.fts.e_commerce.entity.Product;
import com.fts.e_commerce.service.UserProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class UserProductController {

    private final UserProductService userProductService;

    // Get all products for users to view
    @GetMapping
    public List<Product> getAllProducts() {
        return userProductService.getAllProducts();
    }
}
