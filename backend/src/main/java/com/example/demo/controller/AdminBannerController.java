package com.example.demo.controller;

import com.example.demo.dto.request.CreateBannerRequest;
import com.example.demo.dto.request.UpdateBannerRequest;
import com.example.demo.dto.response.AdminBannerResponse;
import com.example.demo.service.AdminBannerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/banners")
@RequiredArgsConstructor
public class AdminBannerController {

    private final AdminBannerService service;

    @GetMapping
    public ResponseEntity<List<AdminBannerResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminBannerResponse> findById(@PathVariable String id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<AdminBannerResponse> create(@Valid @RequestBody CreateBannerRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminBannerResponse> update(
            @PathVariable String id,
            @Valid @RequestBody UpdateBannerRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<AdminBannerResponse> toggleActive(@PathVariable String id) {
        return ResponseEntity.ok(service.toggleActive(id));
    }
}
