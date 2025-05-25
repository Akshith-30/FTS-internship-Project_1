package com.fts.e_commerce.controller;

import com.fts.e_commerce.entity.CartItem;
import com.fts.e_commerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long productId = request.get("productId");

        cartService.addToCart(userId, productId);
        return ResponseEntity.ok("Product added to cart");
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCartItems(@RequestParam Long userId) {
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }

    @GetMapping("/total")
    public ResponseEntity<BigDecimal> getCartTotal(@RequestParam Long userId) {
        return ResponseEntity.ok(cartService.getCartTotal(userId));
    }
}

