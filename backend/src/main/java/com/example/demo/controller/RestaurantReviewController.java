package com.example.demo.controller;

import com.example.demo.dto.request.CreateRestaurantReviewRequest;
import com.example.demo.dto.response.RestaurantReviewResponse;
import com.example.demo.service.RestaurantReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/restaurant-reviews")
@RequiredArgsConstructor
public class RestaurantReviewController {

    private final RestaurantReviewService restaurantReviewService;

    @PostMapping
    public ResponseEntity<RestaurantReviewResponse> createReview(
            @RequestHeader("X-User-Id") String userId,
            @Valid @RequestBody CreateRestaurantReviewRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(restaurantReviewService.createReview(userId, request));
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<RestaurantReviewResponse>> getRestaurantReviews(
            @PathVariable String restaurantId
    ) {
        return ResponseEntity.ok(restaurantReviewService.getRestaurantReviews(restaurantId));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<RestaurantReviewResponse>> getOrderReviews(
            @PathVariable String orderId
    ) {
        return ResponseEntity.ok(restaurantReviewService.getOrderReviews(orderId));
    }

    @GetMapping("/check")
    public ResponseEntity<Map<String, Boolean>> checkReviewed(
            @RequestParam String orderId,
            @RequestHeader("X-User-Id") String userId
    ) {
        boolean reviewed = restaurantReviewService.hasReviewed(orderId, userId);
        return ResponseEntity.ok(Map.of("reviewed", reviewed));
    }
}
