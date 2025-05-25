package com.fts.e_commerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "t_ecom_cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;

    public void setCart(Cart cart) {
    }

    public void setProduct(Product product) {
    }

    public Cart getQuantity() {
    }
}
