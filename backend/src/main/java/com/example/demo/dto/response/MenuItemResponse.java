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

    @JsonProperty("sales_count")
    private String salesCount;

    @JsonProperty("is_popular")
    private Boolean isPopular;

    private List<String> variants;
    private List<MenuCustomizationResponse> customizations;

    public static MenuItemResponse from(MenuItem item) {
        return MenuItemResponse.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .imageUrl(item.getImageUrl())
                .category(item.getCategory())
                .rating(item.getRating())
                .salesCount(item.getSalesCount())
                .isPopular(item.getIsPopular())
                .variants(item.getVariants())
                .customizations(item.getCustomizations().isEmpty() ? null
                        : item.getCustomizations().stream()
                                .map(MenuCustomizationResponse::from)
                                .toList())
                .build();
    }
}
