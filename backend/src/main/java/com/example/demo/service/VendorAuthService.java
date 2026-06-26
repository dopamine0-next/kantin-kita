package com.example.demo.service;

import com.example.demo.dto.request.VendorLoginRequest;
import com.example.demo.dto.response.VendorLoginResponse;
import com.example.demo.dto.response.VendorProfileResponse;
import com.example.demo.entity.Restaurant;
import com.example.demo.entity.Vendor;
import com.example.demo.repository.RestaurantRepository;
import com.example.demo.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VendorAuthService {

    private final VendorRepository vendorRepository;
    private final RestaurantRepository restaurantRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public VendorLoginResponse login(VendorLoginRequest request) {
        Vendor vendor = vendorRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), vendor.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        String token = jwtService.generateToken(vendor.getId(), "VENDOR");
        List<Restaurant> restaurants = restaurantRepository.findByVendorId(vendor.getId());

        return VendorLoginResponse.builder()
                .token(token)
                .vendor(VendorProfileResponse.from(vendor, restaurants))
                .build();
    }

    public VendorProfileResponse getProfile(String vendorId) {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendor not found"));

        List<Restaurant> restaurants = restaurantRepository.findByVendorId(vendorId);
        return VendorProfileResponse.from(vendor, restaurants);
    }
}
