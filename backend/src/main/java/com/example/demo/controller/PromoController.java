package com.example.demo.controller;

import com.example.demo.dto.response.PromoResponse;
import com.example.demo.service.PromoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/promos")
@RequiredArgsConstructor
public class PromoController {

    private final PromoService promoService;

    @GetMapping
    public ResponseEntity<List<PromoResponse>> getPromos() {
        return ResponseEntity.ok(promoService.getPromos());
    }
}