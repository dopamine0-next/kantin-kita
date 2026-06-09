package com.example.demo.dto.response;

import com.example.demo.entity.Restaurant;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RestaurantDetailResponse {

    private String id;
    private String name;
    private String cuisine;
    private Double rating;

    @JsonProperty("rating_count")
    private Integer ratingCount;

    @JsonProperty("reviews_count")
    private Integer reviewsCount;

    @JsonProperty("is_open")
    private Boolean isOpen;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("location_id")
    private String locationId;

    @JsonProperty("cheapest_price")
    private Double cheapestPrice;

    private List<String> promos;

    @JsonProperty("banner_image_url")
    private String bannerImageUrl;

    private String address;

    @JsonProperty("operational_hours")
    private String operationalHours;

    private List<String> categories;
    private List<MenuItemResponse> menus;

    public static RestaurantDetailResponse from(Restaurant restaurant, List<MenuItemResponse> menuResponses,
                                                  Double rating, Integer ratingCount) {
        List<String> categories = menuResponses.stream()
                .map(MenuItemResponse::getCategory)
                .distinct()
                .sorted()
                .toList();

        return RestaurantDetailResponse.builder()
                .id(restaurant.getId())
                .name(restaurant.getName())
                .cuisine(restaurant.getCuisine())
                .rating(rating != null ? Math.round(rating * 10.0) / 10.0 : null)
                .ratingCount(ratingCount)
                .reviewsCount(ratingCount)
                .isOpen(restaurant.getIsOpen())
                .imageUrl(restaurant.getImageUrl())
                .locationId(restaurant.getLocation() != null ? restaurant.getLocation().getId() : null)
                .cheapestPrice(restaurant.getCheapestPrice())
                .promos(restaurant.getPromos() != null && !restaurant.getPromos().isEmpty()
                        ? restaurant.getPromos() : null)
                .bannerImageUrl(restaurant.getBannerImageUrl())
                .address(restaurant.getAddress())
                .operationalHours(restaurant.getOperationalHours())
                .categories(categories)
                .menus(menuResponses)
                .build();
    }
}
