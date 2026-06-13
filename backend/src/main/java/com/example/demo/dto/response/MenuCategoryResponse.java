package com.example.demo.dto.response;

import com.example.demo.entity.MenuCategory;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuCategoryResponse {

    private String id;
    private String name;
    private Integer priority;

    public static MenuCategoryResponse from(MenuCategory category) {
        return MenuCategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .priority(category.getPriority())
                .build();
    }
}
