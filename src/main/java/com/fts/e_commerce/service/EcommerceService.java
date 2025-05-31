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

    /**
     * Registers a new user.
     *
     * @param userEntity user entity to save
     */
    public void registerUserDetails(UserEntity userEntity) {
        // Optional: Add validation logic here before saving
        userRepository.save(userEntity);
    }

    /**
     * Searches users by a search string on full name.
     *
     * @param searchString partial/full name to search for
     * @return list of matching users
     */
    public List<UserEntity> searchUserDetails(String searchString) {
        return userRepository.searchUserDetails(searchString);
    }

    /**
     * Retrieves a user by ID.
     *
     * @param id user ID
     * @return UserEntity if found, otherwise null
     */
    public UserEntity getUserDetailsById(Integer id) {
        Optional<UserEntity> user = userRepository.findById(Long.valueOf(id));
        return user.orElse(null);
    }

    /**
     * Validates user login credentials.
     *
     * @param email user's email
     * @param password user's password
     * @return Optional containing UserEntity if credentials match, else empty
     */
    public Optional<UserEntity> validateUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
}
