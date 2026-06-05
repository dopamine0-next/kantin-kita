package com.example.demo.controller;

import com.example.demo.dto.response.RestaurantReviewResponse;
import com.example.demo.service.VendorReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vendor/restaurants/{restaurantId}/reviews")
@RequiredArgsConstructor
public class VendorReviewController {

    private final VendorReviewService vendorReviewService;

    @GetMapping
    public ResponseEntity<List<RestaurantReviewResponse>> getReviews(
            Authentication authentication,
            @PathVariable String restaurantId) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorReviewService.getReviews(vendorId, restaurantId));
    }
}
