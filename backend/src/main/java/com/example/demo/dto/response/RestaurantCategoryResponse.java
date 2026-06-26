package com.example.demo.dto.response;

import com.example.demo.entity.RestaurantCategory;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RestaurantCategoryResponse {

    private String id;
    private String name;

    public static RestaurantCategoryResponse from(RestaurantCategory category) {
        return RestaurantCategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }
}
