package com.fts.e_commerce.service;

import com.fts.e_commerce.entity.Product;
import com.fts.e_commerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserProductService {

    private final ProductRepository productRepository;

    /**
     * Fetch all products available in the system.
     *
     * @return list of products
     */
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
