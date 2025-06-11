package com.fts.e_commerce.service;

import com.fts.e_commerce.entity.Product;
import com.fts.e_commerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // Save product via JSON (without image upload)
    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    // Save product with uploaded image
    public void saveProductWithImage(
            String name,
            String description,
            BigDecimal price,
            Integer stock,
            String category,
            MultipartFile imageFile
    ) throws IOException {
        String uploadDir = "src/main/resources/static/product-images/";
        String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.createDirectories(filePath.getParent());
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStock(stock);
        product.setCategory(category);
        product.setImage(fileName); // Legacy field (can be used for filename tracking)
        product.setImagePath("/product-images/" + fileName); // For frontend access

        productRepository.save(product);
    }

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get products by category
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    // Get distinct category names (for dropdown)
    public List<String> getAllDistinctCategories() {
        return productRepository.findDistinctCategories();
    }

    // Update an existing product
    public void updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setStock(updatedProduct.getStock());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setImage(updatedProduct.getImage());
        existingProduct.setImagePath(updatedProduct.getImagePath());
        existingProduct.setCategory(updatedProduct.getCategory());

        productRepository.save(existingProduct);
    }

    // Delete product by ID
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }
}
