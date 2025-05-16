package com.fts.e_commerce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class Orders {

    @Entity
    @Table(name = "t_e_com_orders")
    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Order {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String customerName;
        private LocalDateTime orderDate;

        @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
        private List<OrderItem> items;
    }
}
