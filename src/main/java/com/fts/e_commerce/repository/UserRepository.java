package com.fts.e_commerce.repository;

import com.fts.e_commerce.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity,Long> {


    @Query(value = "SELECT * FROM build_app.t_ecom_users WHERE full_name like CONCAT('%', :searchString, '%')", nativeQuery = true)
    List<UserEntity> searchUserDetails(@Param("searchString") String searchString);

}
