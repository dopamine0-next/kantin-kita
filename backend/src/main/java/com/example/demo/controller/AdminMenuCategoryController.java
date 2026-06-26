package com.example.demo.controller;

import com.example.demo.dto.request.CreateMenuCategoryRequest;
import com.example.demo.dto.request.UpdateMenuCategoryRequest;
import com.example.demo.dto.response.MenuCategoryResponse;
import com.example.demo.service.AdminMenuCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/menu-categories")
@RequiredArgsConstructor
public class AdminMenuCategoryController {

    private final AdminMenuCategoryService service;

    @GetMapping
    public ResponseEntity<List<MenuCategoryResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuCategoryResponse> findById(@PathVariable String id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<MenuCategoryResponse> create(@Valid @RequestBody CreateMenuCategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuCategoryResponse> update(
            @PathVariable String id,
            @Valid @RequestBody UpdateMenuCategoryRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
