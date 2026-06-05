package com.example.demo.controller;

import com.example.demo.dto.request.VendorLoginRequest;
import com.example.demo.dto.response.VendorLoginResponse;
import com.example.demo.dto.response.VendorProfileResponse;
import com.example.demo.service.VendorAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/vendor/auth")
@RequiredArgsConstructor
public class VendorAuthController {

    private final VendorAuthService vendorAuthService;

    @PostMapping("/login")
    public ResponseEntity<VendorLoginResponse> login(@Valid @RequestBody VendorLoginRequest request) {
        return ResponseEntity.ok(vendorAuthService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<VendorProfileResponse> me(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorAuthService.getProfile(userId));
    }
}
