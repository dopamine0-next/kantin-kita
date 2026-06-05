package com.example.demo.controller;

import com.example.demo.dto.response.*;
import com.example.demo.service.VendorAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/vendor/restaurants/{restaurantId}/analytics")
@RequiredArgsConstructor
public class VendorAnalyticsController {

    private final VendorAnalyticsService vendorAnalyticsService;

    @GetMapping("/summary")
    public ResponseEntity<VendorAnalyticsSummaryResponse> getSummary(
            Authentication authentication,
            @PathVariable String restaurantId) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorAnalyticsService.getSummary(vendorId, restaurantId));
    }

    @GetMapping("/revenue")
    public ResponseEntity<VendorRevenueResponse> getRevenue(
            Authentication authentication,
            @PathVariable String restaurantId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorAnalyticsService.getRevenue(vendorId, restaurantId, dateFrom, dateTo));
    }

    @GetMapping("/top-items")
    public ResponseEntity<List<VendorTopItemResponse>> getTopItems(
            Authentication authentication,
            @PathVariable String restaurantId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorAnalyticsService.getTopItems(vendorId, restaurantId, dateFrom, dateTo));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<VendorOrderTrendResponse>> getOrderTrends(
            Authentication authentication,
            @PathVariable String restaurantId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorAnalyticsService.getOrderTrends(vendorId, restaurantId, dateFrom, dateTo));
    }
}
