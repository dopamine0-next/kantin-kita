package com.example.demo.controller;

import com.example.demo.dto.request.UpdateOrderStatusRequest;
import com.example.demo.dto.response.VendorOrderResponse;
import com.example.demo.service.VendorOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/vendor")
@RequiredArgsConstructor
public class VendorOrderController {

    private final VendorOrderService vendorOrderService;

    @GetMapping("/restaurants/{restaurantId}/orders")
    public ResponseEntity<List<VendorOrderResponse>> listOrders(
            Authentication authentication,
            @PathVariable String restaurantId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorOrderService.listOrders(vendorId, restaurantId, status, dateFrom, dateTo));
    }

    @GetMapping("/orders/{orderId}")
    public ResponseEntity<VendorOrderResponse> getOrderDetail(
            Authentication authentication,
            @PathVariable String orderId) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorOrderService.getOrderDetail(vendorId, orderId));
    }

    @PatchMapping("/orders/{orderId}/status")
    public ResponseEntity<VendorOrderResponse> updateStatus(
            Authentication authentication,
            @PathVariable String orderId,
            @Valid @RequestBody UpdateOrderStatusRequest request) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorOrderService.updateStatus(vendorId, orderId, request.getStatus()));
    }
}
