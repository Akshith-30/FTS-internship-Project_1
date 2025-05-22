package com.fts.e_commerce.service;

import com.fts.e_commerce.entity.Product;
import com.fts.e_commerce.entity.UserEntity;
import com.fts.e_commerce.repository.ProductRepository;
import com.fts.e_commerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EcommerceService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository; // add this

    public void registerUserDetails(UserEntity userEntity) {
        // validation logic here (optional)
        userRepository.save(userEntity);
    }

    public List<UserEntity> searchUserDetails(String searchString) {
        return userRepository.searchUserDetails(searchString);
    }

    public UserEntity getUserDetailsById(Integer id) {
        Optional<UserEntity> user = userRepository.findById(Long.valueOf(id));
        return user.orElse(null);
    }
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    public void updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setStock(updatedProduct.getStock());
        existingProduct.setDescription(updatedProduct.getDescription());

        productRepository.save(existingProduct);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }
}

