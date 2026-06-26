package com.example.demo.controller;

import com.example.demo.dto.request.AdminLoginRequest;
import com.example.demo.dto.response.AdminLoginResponse;
import com.example.demo.dto.response.AdminProfileResponse;
import com.example.demo.service.AdminAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/auth")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponse> login(@Valid @RequestBody AdminLoginRequest request) {
        return ResponseEntity.ok(adminAuthService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<AdminProfileResponse> me(Authentication authentication) {
        String adminId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(adminAuthService.getProfile(adminId));
    }
}
