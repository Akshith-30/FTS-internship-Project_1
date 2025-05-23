package com.fts.e_commerce.service;

import com.fts.e_commerce.entity.UserEntity;
import com.fts.e_commerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EcommerceService {

    private final UserRepository userRepository;

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
}
