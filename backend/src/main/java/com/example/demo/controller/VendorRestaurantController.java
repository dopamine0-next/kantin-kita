package com.example.demo.controller;

import com.example.demo.dto.request.UpdateHoursRequest;
import com.example.demo.dto.request.UpdateRestaurantRequest;
import com.example.demo.dto.response.VendorRestaurantResponse;
import com.example.demo.service.VendorRestaurantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/vendor/restaurants")
@RequiredArgsConstructor
public class VendorRestaurantController {

    private final VendorRestaurantService vendorRestaurantService;

    @GetMapping("/{id}")
    public ResponseEntity<VendorRestaurantResponse> getRestaurant(
            Authentication authentication,
            @PathVariable String id) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorRestaurantService.getRestaurant(vendorId, id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VendorRestaurantResponse> updateRestaurant(
            Authentication authentication,
            @PathVariable String id,
            @Valid @RequestBody UpdateRestaurantRequest request) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorRestaurantService.updateRestaurant(vendorId, id, request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<VendorRestaurantResponse> toggleStatus(
            Authentication authentication,
            @PathVariable String id) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorRestaurantService.toggleStatus(vendorId, id));
    }

    @PutMapping("/{id}/hours")
    public ResponseEntity<VendorRestaurantResponse> updateHours(
            Authentication authentication,
            @PathVariable String id,
            @Valid @RequestBody UpdateHoursRequest request) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorRestaurantService.updateHours(vendorId, id, request));
    }
}
