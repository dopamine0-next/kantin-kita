package com.example.demo.controller;

import com.example.demo.dto.request.CreateLocationRequest;
import com.example.demo.dto.request.UpdateLocationRequest;
import com.example.demo.dto.response.LocationResponse;
import com.example.demo.service.AdminLocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/locations")
@RequiredArgsConstructor
public class AdminLocationController {

    private final AdminLocationService service;

    @GetMapping
    public ResponseEntity<List<LocationResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationResponse> findById(@PathVariable String id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<LocationResponse> create(@Valid @RequestBody CreateLocationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocationResponse> update(
            @PathVariable String id,
            @Valid @RequestBody UpdateLocationRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
