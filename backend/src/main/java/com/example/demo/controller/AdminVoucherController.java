package com.example.demo.controller;

import com.example.demo.dto.request.CreateVoucherRequest;
import com.example.demo.dto.request.UpdateVoucherRequest;
import com.example.demo.dto.response.AdminVoucherResponse;
import com.example.demo.service.AdminVoucherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/vouchers")
@RequiredArgsConstructor
public class AdminVoucherController {

    private final AdminVoucherService service;

    @GetMapping
    public ResponseEntity<List<AdminVoucherResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminVoucherResponse> findById(@PathVariable String id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<AdminVoucherResponse> create(@Valid @RequestBody CreateVoucherRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminVoucherResponse> update(
            @PathVariable String id,
            @Valid @RequestBody UpdateVoucherRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<AdminVoucherResponse> toggleActive(@PathVariable String id) {
        return ResponseEntity.ok(service.toggleActive(id));
    }
}
