package com.example.demo.controller;

import com.example.demo.dto.request.CreateMenuItemReviewRequest;
import com.example.demo.dto.response.MenuItemReviewResponse;
import com.example.demo.service.MenuItemReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/menu-item-reviews")
@RequiredArgsConstructor
public class MenuItemReviewController {

    private final MenuItemReviewService menuItemReviewService;

    @PostMapping
    public ResponseEntity<MenuItemReviewResponse> createReview(
            @RequestHeader("X-User-Id") String userId,
            @Valid @RequestBody CreateMenuItemReviewRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(menuItemReviewService.createReview(userId, request));
    }

    @GetMapping("/menu-item/{menuItemId}")
    public ResponseEntity<List<MenuItemReviewResponse>> getMenuItemReviews(
            @PathVariable String menuItemId
    ) {
        return ResponseEntity.ok(menuItemReviewService.getMenuItemReviews(menuItemId));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<MenuItemReviewResponse>> getOrderReviews(
            @PathVariable String orderId
    ) {
        return ResponseEntity.ok(menuItemReviewService.getOrderReviews(orderId));
    }
}
