package com.fts.e_commerce.service;

import com.fts.e_commerce.entity.Cart;
import com.fts.e_commerce.entity.CartItem;
import com.fts.e_commerce.entity.Product;
import com.fts.e_commerce.entity.UserEntity;
import com.fts.e_commerce.repository.CartItemRepository;
import com.fts.e_commerce.repository.CartRepository;
import com.fts.e_commerce.repository.ProductRepository;
import com.fts.e_commerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired private CartItemRepository cartItemRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private UserRepository userRepository;

    public void addToCart(Long userId, Long productId) {
        UserEntity user = userRepository.findById(userId).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();

        Cart cart = cartRepository.findByUser(user).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });

        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product)
                .orElse(new CartItem());
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setCart(cartItem.getQuantity()+1);

        cartItemRepository.save(cartItem);
    }

    public List<CartItem> getCartItems(Long userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow();
        Cart cart = cartRepository.findByUser(user).orElseThrow();
        return cart.getItems();
    }

    // Add remove and clear methods as needed
}
