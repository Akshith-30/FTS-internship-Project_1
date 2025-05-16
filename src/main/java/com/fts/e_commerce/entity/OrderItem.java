package com.fts.e_commerce.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.Order;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class OrderItem {
    @Entity
    @Table(name = "t_e_com_order_items")
    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class orderItem {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "order_id")
        private Order order;

        @ManyToOne
        @JoinColumn(name = "product_id")
        private Product product;

        private Integer quantity;
        private Double price;

    }
}
