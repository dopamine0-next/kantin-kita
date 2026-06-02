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
public class RestaurantResponse {

    private String id;
    private String name;
    private String cuisine;
    private Double rating;

    @JsonProperty("reviews_count")
    private String reviewsCount;

    @JsonProperty("walk_time")
    private String walkTime;

    private String distance;

    @JsonProperty("is_open")
    private Boolean isOpen;

    @JsonProperty("promo_text")
    private String promoText;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("location_id")
    private String locationId;

    @JsonProperty("cheapest_price")
    private Double cheapestPrice;

    @JsonProperty("is_instant")
    private Boolean isInstant;

    private List<String> promos;

    public static RestaurantResponse from(Restaurant restaurant) {
        return RestaurantResponse.builder()
                .id(restaurant.getId())
                .name(restaurant.getName())
                .cuisine(restaurant.getCuisine())
                .rating(restaurant.getRating())
                .reviewsCount(restaurant.getReviewsCount())
                .walkTime(restaurant.getWalkTime())
                .distance(restaurant.getDistance())
                .isOpen(restaurant.getIsOpen())
                .promoText(restaurant.getPromoText())
                .imageUrl(restaurant.getImageUrl())
                .locationId(restaurant.getLocation() != null ? restaurant.getLocation().getId() : null)
                .cheapestPrice(restaurant.getCheapestPrice())
                .isInstant(restaurant.getIsInstant())
                .promos(restaurant.getPromos() != null && !restaurant.getPromos().isEmpty()
                        ? restaurant.getPromos() : null)
                .build();
    }
}
