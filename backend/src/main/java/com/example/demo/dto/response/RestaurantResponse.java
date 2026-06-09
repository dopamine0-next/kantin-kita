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

    public static RestaurantResponse from(Restaurant restaurant, Double rating, Integer ratingCount) {
        return RestaurantResponse.builder()
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
                .build();
    }
}
