package com.example.demo.controller;

import com.example.demo.dto.response.MenuItemResponse;
import com.example.demo.service.MenuItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/menus")
@RequiredArgsConstructor
public class MenuController {

    private final MenuItemService menuItemService;

    @GetMapping("/search")
    public ResponseEntity<List<MenuItemResponse>> searchMenu(@RequestParam String q) {
        return ResponseEntity.ok(menuItemService.searchMenu(q));
    }
}
