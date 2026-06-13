package com.example.demo.dto.response;

import com.example.demo.entity.Restaurant;
import com.example.demo.entity.Vendor;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminVendorResponse {

    private String id;
    private String name;
    private String email;
    private String phone;
    private String avatarUrl;
    private String createdAt;
    private List<AdminVendorRestaurantItem> restaurants;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AdminVendorRestaurantItem {
        private String id;
        private String name;
    }

    public static AdminVendorResponse from(Vendor vendor, List<Restaurant> restaurants) {
        return AdminVendorResponse.builder()
                .id(vendor.getId())
                .name(vendor.getName())
                .email(vendor.getEmail())
                .phone(vendor.getPhone())
                .avatarUrl(vendor.getAvatarUrl())
                .createdAt(vendor.getCreatedAt() != null ? vendor.getCreatedAt().toString() : null)
                .restaurants(restaurants.stream()
                        .map(r -> AdminVendorRestaurantItem.builder()
                                .id(r.getId())
                                .name(r.getName())
                                .build())
                        .toList())
                .build();
    }
}
