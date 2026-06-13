package com.example.demo.controller;

import com.example.demo.dto.response.MenuCategoryResponse;
import com.example.demo.service.MenuCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/menu-categories")
@RequiredArgsConstructor
public class MenuCategoryController {

    private final MenuCategoryService menuCategoryService;

    @GetMapping
    public ResponseEntity<List<MenuCategoryResponse>> getCategories() {
        return ResponseEntity.ok(menuCategoryService.getCategories());
    }
}
