package com.example.demo.dto.response;

import com.example.demo.entity.Restaurant;
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
    private String cuisine;
    private Double rating;
    private Integer ratingCount;
    private Integer reviewsCount;
    private Boolean isOpen;
    private String promoText;
    private String imageUrl;
    private String bannerImageUrl;
    private String address;
    private String operationalHours;
    private String locationId;
    private String locationName;
    private Double cheapestPrice;
    private Boolean isInstant;
    private List<String> promos;

    public static VendorRestaurantResponse from(Restaurant restaurant, Double rating, Integer ratingCount) {
        return VendorRestaurantResponse.builder()
                .id(restaurant.getId())
                .name(restaurant.getName())
                .cuisine(restaurant.getCuisine())
                .rating(rating)
                .ratingCount(ratingCount)
                .reviewsCount(ratingCount)
                .isOpen(restaurant.getIsOpen())
                .promoText(restaurant.getPromoText())
                .imageUrl(restaurant.getImageUrl())
                .bannerImageUrl(restaurant.getBannerImageUrl())
                .address(restaurant.getAddress())
                .operationalHours(restaurant.getOperationalHours())
                .locationId(restaurant.getLocation() != null ? restaurant.getLocation().getId() : null)
                .locationName(restaurant.getLocation() != null ? restaurant.getLocation().getName() : null)
                .cheapestPrice(restaurant.getCheapestPrice())
                .isInstant(restaurant.getIsInstant())
                .promos(restaurant.getPromos() != null && !restaurant.getPromos().isEmpty()
                        ? restaurant.getPromos() : null)
                .build();
    }
}
