package com.example.demo.controller;

import com.example.demo.dto.response.RestaurantDetailResponse;
import com.example.demo.dto.response.RestaurantResponse;
import com.example.demo.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping
    public ResponseEntity<List<RestaurantResponse>> getRestaurants(
            @RequestParam(required = false) Integer locationId,
            @RequestParam(required = false) String search
    ) {
        return ResponseEntity.ok(restaurantService.getRestaurants(locationId, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestaurantDetailResponse> getRestaurantDetail(@PathVariable UUID id) {
        return ResponseEntity.ok(restaurantService.getRestaurantDetail(id));
    }
}
