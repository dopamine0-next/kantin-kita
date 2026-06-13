package com.example.demo.controller;

import com.example.demo.dto.request.AdminUpdateRestaurantRequest;
import com.example.demo.dto.request.CreateRestaurantRequest;
import com.example.demo.dto.response.AdminRestaurantResponse;
import com.example.demo.service.AdminRestaurantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/restaurants")
@RequiredArgsConstructor
public class AdminRestaurantController {

    private final AdminRestaurantService service;

    @GetMapping
    public ResponseEntity<List<AdminRestaurantResponse>> findAll(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String locationId,
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) String vendorId,
            @RequestParam(required = false) Boolean isOpen) {
        return ResponseEntity.ok(service.findAll(q, locationId, categoryId, vendorId, isOpen));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminRestaurantResponse> findById(@PathVariable String id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<AdminRestaurantResponse> create(@Valid @RequestBody CreateRestaurantRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminRestaurantResponse> update(
            @PathVariable String id,
            @Valid @RequestBody AdminUpdateRestaurantRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<AdminRestaurantResponse> toggleStatus(@PathVariable String id) {
        return ResponseEntity.ok(service.toggleStatus(id));
    }
}
