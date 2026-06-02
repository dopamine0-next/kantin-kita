package com.example.demo.controller;

import com.example.demo.dto.response.BannerResponse;
import com.example.demo.service.BannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/banners")
@RequiredArgsConstructor
public class BannerController {

    private final BannerService bannerService;

    @GetMapping
    public ResponseEntity<List<BannerResponse>> getBanners(
            @RequestParam(required = false) Integer locationId
    ) {
        return ResponseEntity.ok(bannerService.getBanners(locationId));
    }
}
