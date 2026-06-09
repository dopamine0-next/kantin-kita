package com.example.demo.dto.response;

import com.example.demo.entity.MenuItem;
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
public class MenuItemResponse {

    private String id;
    private String name;
    private String description;
    private Double price;

    @JsonProperty("image_url")
    private String imageUrl;

    private String category;
    private Double rating;

    @JsonProperty("rating_count")
    private Integer ratingCount;

    @JsonProperty("is_popular")
    private Boolean isPopular;

    @JsonProperty("prep_time")
    private String prepTime;

    private String stall;

    @JsonProperty("restaurant_id")
    private String restaurantId;

    private List<MenuCustomizationResponse> customizations;

    public static MenuItemResponse from(MenuItem item) {
        return MenuItemResponse.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .imageUrl(item.getImageUrl())
                .category(item.getCategory())
                .rating(Math.round(item.getRating() * 10.0) / 10.0)
                .ratingCount(item.getRatingCount())
                .isPopular(item.getIsPopular())
                .prepTime(item.getPrepTime())
                .stall(item.getRestaurant().getName())
                .restaurantId(item.getRestaurant().getId())
                .customizations(item.getCustomizations().isEmpty() ? null
                        : item.getCustomizations().stream()
                                .map(MenuCustomizationResponse::from)
                                .toList())
                .build();
    }
}
