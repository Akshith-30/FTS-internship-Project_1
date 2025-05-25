package com.fts.e_commerce.controller;

import com.fts.e_commerce.entity.CartItem;
import com.fts.e_commerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Long> request) {
        cartService.addToCart(request.get("userId"), request.get("productId"));
        return ResponseEntity.ok("Item added");
    }

//    @GetMapping
//    public ResponseEntity<List<CartItem>> getCart(@RequestParam Long userId) {
//        return ResponseEntity.ok(cartService.getCartItems(userId));
//    }
}
//