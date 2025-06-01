package com.fts.e_commerce.repository;

import com.fts.e_commerce.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    // 🔍 1. Full name search (already present)
    @Query(value = "SELECT * FROM build_app.t_ecom_users WHERE full_name LIKE CONCAT('%', :searchString, '%')", nativeQuery = true)
    List<UserEntity> searchUserDetails(@Param("searchString") String searchString);

    // 🔐 2. Find user by email and password (for login)
    Optional<UserEntity> findByEmailAndPassword(String email, String password);
}
