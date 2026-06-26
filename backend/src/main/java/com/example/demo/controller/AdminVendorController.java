package com.example.demo.controller;

import com.example.demo.dto.request.CreateVendorRequest;
import com.example.demo.dto.request.UpdateVendorRequest;
import com.example.demo.dto.response.AdminVendorResponse;
import com.example.demo.service.AdminVendorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/vendors")
@RequiredArgsConstructor
public class AdminVendorController {

    private final AdminVendorService service;

    @GetMapping
    public ResponseEntity<List<AdminVendorResponse>> findAll(
            @RequestParam(required = false) String q) {
        return ResponseEntity.ok(service.findAll(q));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminVendorResponse> findById(@PathVariable String id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<AdminVendorResponse> create(@Valid @RequestBody CreateVendorRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminVendorResponse> update(
            @PathVariable String id,
            @Valid @RequestBody UpdateVendorRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
