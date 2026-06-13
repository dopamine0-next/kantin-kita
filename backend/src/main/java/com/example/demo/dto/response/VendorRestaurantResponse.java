package com.example.demo.dto.response;

import com.example.demo.entity.Restaurant;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorRestaurantResponse {

    private String id;
    private String name;
    @JsonProperty("restaurant_category")
    private RestaurantCategoryResponse restaurantCategory;
    private Double rating;
    private Integer ratingCount;
    private Integer reviewsCount;
    private Boolean isOpen;
    private String imageUrl;
    private String bannerImageUrl;
    private String address;
    private String operationalHours;
    private String locationId;
    private String locationName;
    private Double cheapestPrice;
    private List<String> promos;

    public static VendorRestaurantResponse from(Restaurant restaurant, Double rating, Integer ratingCount) {
        return VendorRestaurantResponse.builder()
                .id(restaurant.getId())
                .name(restaurant.getName())
                .restaurantCategory(restaurant.getRestaurantCategory() != null
                        ? RestaurantCategoryResponse.from(restaurant.getRestaurantCategory()) : null)
                .rating(rating)
                .ratingCount(ratingCount)
                .reviewsCount(ratingCount)
                .isOpen(restaurant.getIsOpen())
                .imageUrl(restaurant.getImageUrl())
                .bannerImageUrl(restaurant.getBannerImageUrl())
                .address(restaurant.getAddress())
                .operationalHours(restaurant.getOperationalHours())
                .locationId(restaurant.getLocation() != null ? restaurant.getLocation().getId() : null)
                .locationName(restaurant.getLocation() != null ? restaurant.getLocation().getName() : null)
                .cheapestPrice(restaurant.getCheapestPrice())
                .promos(restaurant.getPromos() != null && !restaurant.getPromos().isEmpty()
                        ? restaurant.getPromos() : null)
                .build();
    }
}
