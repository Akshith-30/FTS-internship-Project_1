package com.fts.e_commerce.repository;

import com.fts.e_commerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // No custom queries needed unless you want to add some specific search
}
