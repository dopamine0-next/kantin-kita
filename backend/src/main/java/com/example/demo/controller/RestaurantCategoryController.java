package com.example.demo.controller;

import com.example.demo.dto.response.RestaurantCategoryResponse;
import com.example.demo.service.RestaurantCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/restaurant-categories")
@RequiredArgsConstructor
public class RestaurantCategoryController {

    private final RestaurantCategoryService restaurantCategoryService;

    @GetMapping
    public ResponseEntity<List<RestaurantCategoryResponse>> getCategories() {
        return ResponseEntity.ok(restaurantCategoryService.getCategories());
    }
}
