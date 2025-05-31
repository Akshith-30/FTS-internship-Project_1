package com.fts.e_commerce.repository;

import com.fts.e_commerce.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    /**
     * Search users by full name using a partial match.
     *
     * @param searchString partial or full name to search
     * @return list of matching UserEntity objects
     */
    // JPQL query uses entity field name 'fullName'
    @Query("SELECT u FROM UserEntity u WHERE u.fullName LIKE %:searchString%")
    List<UserEntity> searchUserDetails(@Param("searchString") String searchString);

    /**
     * Find user by email and password for login authentication.
     *
     * @param email user's email
     * @param password user's password
     * @return Optional containing user if found
     */
    Optional<UserEntity> findByEmailAndPassword(String email, String password);

    /**
     * Find user by email only. Useful for validation or session management.
     *
     * @param email user's email
     * @return Optional containing user if found
     */
    Optional<UserEntity> findByEmail(String email);
}
