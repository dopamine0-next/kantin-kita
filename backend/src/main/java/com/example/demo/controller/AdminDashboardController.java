package com.example.demo.controller;

import com.example.demo.dto.response.AdminDashboardSummaryResponse;
import com.example.demo.dto.response.AdminOrderTrendResponse;
import com.example.demo.dto.response.AdminRestaurantRankingResponse;
import com.example.demo.dto.response.AdminRevenueResponse;
import com.example.demo.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final AdminDashboardService service;

    @GetMapping("/summary")
    public ResponseEntity<AdminDashboardSummaryResponse> getSummary() {
        return ResponseEntity.ok(service.getSummary());
    }

    @GetMapping("/restaurant-rankings")
    public ResponseEntity<List<AdminRestaurantRankingResponse>> getRankings(
            @RequestParam(defaultValue = "revenue") String sortBy,
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(service.getRestaurantRankings(sortBy, limit));
    }

    @GetMapping("/revenue")
    public ResponseEntity<AdminRevenueResponse> getRevenue(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo) {
        return ResponseEntity.ok(service.getRevenue(dateFrom, dateTo));
    }

    @GetMapping("/order-trends")
    public ResponseEntity<List<AdminOrderTrendResponse>> getOrderTrends(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo) {
        return ResponseEntity.ok(service.getOrderTrends(dateFrom, dateTo));
    }
}
