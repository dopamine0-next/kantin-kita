package com.example.demo.dto.response;

import com.example.demo.entity.Restaurant;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminRestaurantResponse {

    private String id;
    private String name;
    private RestaurantCategoryResponse category;
    private AdminVendorRef vendor;
    private LocationResponse location;
    private Boolean isOpen;
    private String imageUrl;
    private String bannerImageUrl;
    private String address;
    private String operationalHours;
    private Double cheapestPrice;
    private Double rating;
    private Integer ratingCount;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AdminVendorRef {
        private String id;
        private String name;
    }

    public static AdminRestaurantResponse from(Restaurant restaurant, Double rating, Integer ratingCount) {
        return AdminRestaurantResponse.builder()
                .id(restaurant.getId())
                .name(restaurant.getName())
                .category(restaurant.getRestaurantCategory() != null
                        ? RestaurantCategoryResponse.from(restaurant.getRestaurantCategory()) : null)
                .vendor(restaurant.getVendor() != null
                        ? AdminVendorRef.builder()
                                .id(restaurant.getVendor().getId())
                                .name(restaurant.getVendor().getName())
                                .build() : null)
                .location(restaurant.getLocation() != null
                        ? LocationResponse.from(restaurant.getLocation()) : null)
                .isOpen(restaurant.getIsOpen())
                .imageUrl(restaurant.getImageUrl())
                .bannerImageUrl(restaurant.getBannerImageUrl())
                .address(restaurant.getAddress())
                .operationalHours(restaurant.getOperationalHours())
                .cheapestPrice(restaurant.getCheapestPrice())
                .rating(rating)
                .ratingCount(ratingCount)
                .build();
    }
}
