package com.example.demo.dto.response;

import com.example.demo.entity.Category;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponse {

    private String id;
    private String name;
    private String iconUrl;
    private Integer priority;

    public static CategoryResponse from(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .iconUrl(category.getIconUrl())
                .priority(category.getPriority())
                .build();
    }
}
