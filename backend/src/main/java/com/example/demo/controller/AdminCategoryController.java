package com.example.demo.controller;

import com.example.demo.dto.request.CreateCategoryRequest;
import com.example.demo.dto.request.UpdateCategoryRequest;
import com.example.demo.dto.response.RestaurantCategoryResponse;
import com.example.demo.service.AdminRestaurantCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/restaurant-categories")
@RequiredArgsConstructor
public class AdminCategoryController {

    private final AdminRestaurantCategoryService service;

    @GetMapping
    public ResponseEntity<List<RestaurantCategoryResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestaurantCategoryResponse> findById(@PathVariable String id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<RestaurantCategoryResponse> create(@Valid @RequestBody CreateCategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RestaurantCategoryResponse> update(
            @PathVariable String id,
            @Valid @RequestBody UpdateCategoryRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
