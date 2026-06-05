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
public class VendorProfileResponse {

    private String id;
    private String name;
    private String email;
    private String phone;
    private String avatarUrl;
    private List<VendorRestaurantItem> restaurants;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class VendorRestaurantItem {
        private String id;
        private String name;
        private String imageUrl;
        private Boolean isOpen;
    }

    public static VendorProfileResponse from(Vendor vendor, List<Restaurant> restaurants) {
        return VendorProfileResponse.builder()
                .id(vendor.getId())
                .name(vendor.getName())
                .email(vendor.getEmail())
                .phone(vendor.getPhone())
                .avatarUrl(vendor.getAvatarUrl())
                .restaurants(restaurants.stream()
                        .map(r -> VendorRestaurantItem.builder()
                                .id(r.getId())
                                .name(r.getName())
                                .imageUrl(r.getImageUrl())
                                .isOpen(r.getIsOpen())
                                .build())
                        .toList())
                .build();
    }
}
