package com.fts.e_commerce.repository;

import com.fts.e_commerce.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {

    @Query(value = "SELECT * FROM t_admin WHERE admin_id = :adminId AND password = :password", nativeQuery = true)
    AdminEntity findByAdminIdAndPassword(@Param("adminId") String adminId, @Param("password") String password);
}
