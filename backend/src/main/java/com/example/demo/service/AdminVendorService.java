package com.example.demo.service;

import com.example.demo.dto.request.CreateVendorRequest;
import com.example.demo.dto.request.UpdateVendorRequest;
import com.example.demo.dto.response.AdminVendorResponse;
import com.example.demo.entity.Vendor;
import com.example.demo.repository.RestaurantRepository;
import com.example.demo.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminVendorService {

    private final VendorRepository vendorRepository;
    private final RestaurantRepository restaurantRepository;
    private final PasswordEncoder passwordEncoder;

    public List<AdminVendorResponse> findAll(String search) {
        List<Vendor> vendors;
        if (search != null && !search.isBlank()) {
            vendors = vendorRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(search, search);
        } else {
            vendors = vendorRepository.findAll();
        }
        return vendors.stream()
                .map(v -> AdminVendorResponse.from(v, restaurantRepository.findByVendorId(v.getId())))
                .toList();
    }

    public AdminVendorResponse findById(String id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendor not found"));
        return AdminVendorResponse.from(vendor, restaurantRepository.findByVendorId(id));
    }

    @Transactional
    public AdminVendorResponse create(CreateVendorRequest request) {
        if (vendorRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        }

        Vendor vendor = Vendor.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .build();

        vendor = vendorRepository.save(vendor);
        return AdminVendorResponse.from(vendor, List.of());
    }

    @Transactional
    public AdminVendorResponse update(String id, UpdateVendorRequest request) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendor not found"));

        if (request.getName() != null) vendor.setName(request.getName());
        if (request.getEmail() != null) {
            if (!vendor.getEmail().equals(request.getEmail()) && vendorRepository.existsByEmail(request.getEmail())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
            }
            vendor.setEmail(request.getEmail());
        }
        if (request.getPhone() != null) vendor.setPhone(request.getPhone());
        if (request.getPassword() != null) vendor.setPassword(passwordEncoder.encode(request.getPassword()));
        if (request.getAvatarUrl() != null) vendor.setAvatarUrl(request.getAvatarUrl());

        vendor = vendorRepository.save(vendor);
        return AdminVendorResponse.from(vendor, restaurantRepository.findByVendorId(id));
    }

    @Transactional
    public void delete(String id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendor not found"));

        if (!vendor.getRestaurants().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot delete vendor with existing restaurants");
        }

        vendorRepository.delete(vendor);
    }
}
