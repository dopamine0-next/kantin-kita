package com.example.demo.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMenuItemRequest {

    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private String categoryId;
    private String prepTime;
    private Double originalPrice;
    private String badgeText;
    private String badgeVariant;
}
