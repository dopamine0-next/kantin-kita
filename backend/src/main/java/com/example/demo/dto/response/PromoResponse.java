package com.example.demo.dto.response;

import com.example.demo.entity.MenuItem;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PromoResponse {

    private String id;

    @JsonProperty("restaurant_id")
    private String restaurantId;

    private String name;

    private String category;

    private Double price;

    @JsonProperty("original_price")
    private Double originalPrice;

    private Double rating;

    @JsonProperty("prep_time")
    private String prepTime;

    @JsonProperty("badge_text")
    private String badgeText;

    @JsonProperty("badge_variant")
    private String badgeVariant;

    @JsonProperty("image_url")
    private String imageUrl;

    public static PromoResponse from(MenuItem item) {
        return PromoResponse.builder()
                .id(item.getId())
                .restaurantId(item.getRestaurant().getId())
                .name(item.getName())
                .category(item.getCategory())
                .price(item.getPrice())
                .originalPrice(item.getOriginalPrice())
                .rating(Math.round(item.getRating() * 10.0) / 10.0)
                .prepTime(item.getPrepTime())
                .badgeText(item.getBadgeText())
                .badgeVariant(item.getBadgeVariant())
                .imageUrl(item.getImageUrl())
                .build();
    }
}