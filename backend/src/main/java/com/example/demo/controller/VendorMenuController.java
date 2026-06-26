package com.example.demo.controller;

import com.example.demo.dto.request.*;
import com.example.demo.dto.response.MenuItemResponse;
import com.example.demo.dto.response.VendorCustomizationOptionResponse;
import com.example.demo.dto.response.VendorCustomizationResponse;
import com.example.demo.service.VendorMenuService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vendor")
@RequiredArgsConstructor
public class VendorMenuController {

    private final VendorMenuService vendorMenuService;

    @GetMapping("/restaurants/{restaurantId}/menus")
    public ResponseEntity<List<MenuItemResponse>> listMenus(
            Authentication authentication,
            @PathVariable String restaurantId) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorMenuService.listMenus(vendorId, restaurantId));
    }

    @PostMapping("/restaurants/{restaurantId}/menus")
    public ResponseEntity<MenuItemResponse> createMenu(
            Authentication authentication,
            @PathVariable String restaurantId,
            @Valid @RequestBody CreateMenuItemRequest request) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(vendorMenuService.createMenu(vendorId, restaurantId, request));
    }

    @PutMapping("/menus/{menuId}")
    public ResponseEntity<MenuItemResponse> updateMenu(
            Authentication authentication,
            @PathVariable String menuId,
            @Valid @RequestBody UpdateMenuItemRequest request) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorMenuService.updateMenu(vendorId, menuId, request));
    }

    @DeleteMapping("/menus/{menuId}")
    public ResponseEntity<Void> deleteMenu(
            Authentication authentication,
            @PathVariable String menuId) {
        String vendorId = (String) authentication.getPrincipal();
        vendorMenuService.deleteMenu(vendorId, menuId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/menus/{menuId}/popular")
    public ResponseEntity<MenuItemResponse> togglePopular(
            Authentication authentication,
            @PathVariable String menuId) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorMenuService.togglePopular(vendorId, menuId));
    }

    @PostMapping("/menus/{menuId}/customizations")
    public ResponseEntity<VendorCustomizationResponse> createCustomization(
            Authentication authentication,
            @PathVariable String menuId,
            @Valid @RequestBody CreateCustomizationRequest request) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(vendorMenuService.createCustomization(vendorId, menuId, request));
    }

    @PutMapping("/customizations/{custId}")
    public ResponseEntity<VendorCustomizationResponse> updateCustomization(
            Authentication authentication,
            @PathVariable String custId,
            @Valid @RequestBody UpdateCustomizationRequest request) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorMenuService.updateCustomization(vendorId, custId, request));
    }

    @DeleteMapping("/customizations/{custId}")
    public ResponseEntity<Void> deleteCustomization(
            Authentication authentication,
            @PathVariable String custId) {
        String vendorId = (String) authentication.getPrincipal();
        vendorMenuService.deleteCustomization(vendorId, custId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/customizations/{custId}/options")
    public ResponseEntity<VendorCustomizationOptionResponse> createOption(
            Authentication authentication,
            @PathVariable String custId,
            @Valid @RequestBody CreateCustomizationOptionRequest request) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(vendorMenuService.createOption(vendorId, custId, request));
    }

    @PutMapping("/customization-options/{optId}")
    public ResponseEntity<VendorCustomizationOptionResponse> updateOption(
            Authentication authentication,
            @PathVariable String optId,
            @Valid @RequestBody UpdateCustomizationOptionRequest request) {
        String vendorId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(vendorMenuService.updateOption(vendorId, optId, request));
    }

    @DeleteMapping("/customization-options/{optId}")
    public ResponseEntity<Void> deleteOption(
            Authentication authentication,
            @PathVariable String optId) {
        String vendorId = (String) authentication.getPrincipal();
        vendorMenuService.deleteOption(vendorId, optId);
        return ResponseEntity.noContent().build();
    }
}
