package com.fts.e_commerce.service;

import com.fts.e_commerce.entity.AdminEntity;
import com.fts.e_commerce.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;

    public boolean validateAdmin(String adminId, String password) {
        AdminEntity admin = adminRepository.findByAdminIdAndPassword(adminId, password);
        return admin != null;  // returns true if admin exists with given credentials
    }
}
