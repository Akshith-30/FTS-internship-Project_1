package com.fts.e_commerce.service;

//import com.fts.e_commerce.entity.Product;
import com.fts.e_commerce.entity.UserEntity;
import com.fts.e_commerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
//import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;
//import sun.security.krb5.internal.ccache.MemoryCredentialsCache;
//private OrderRepository OrderRepository;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EcommerceService {

    private final UserRepository userRepository;

    public void registerUserDetails(UserEntity userEntity) {

        // we need validate user details
        /*
         * validate all user fields are not empty
         * validate password :
         * password should be of more than 8 (length)
         * password should contain least one special character , one capital alphabet,
         * smaller case alphabet , one digit
         *
         */

        userRepository.save(userEntity);
    }

    public List<UserEntity> searchUserDetails(String searchString) {
        return userRepository.searchUserDetails(searchString);
    }

    public UserEntity getUserDetailsById(Integer id) {
        Optional<UserEntity> user =  userRepository.findById(Long.valueOf(id));
        return user.get();
    }

//    public void saveProduct(Product product) {
//        productRepository.save(product);
//    }


//    public void updateProduct(Long id, Product updatedProduct) {
//        Product existingProduct = productRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Product not found"));
//
//        existingProduct.setName(updatedProduct.getName());
//        existingProduct.setPrice(updatedProduct.getPrice());
//        existingProduct.setStock(updatedProduct.getStock());
//        existingProduct.setDescription(updatedProduct.getDescription());
//
//        productRepository.save(existingProduct);
//    }
//
//    public void deleteProduct(Long id) {
//        if (!productRepository.existsById(id)) {
//            throw new RuntimeException("Product not found");
//        }
//        productRepository.deleteById(id);
//    }
}