package com.example.demo.dto.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMenuItemRequest {

    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private String category;
    private String prepTime;
    private Double originalPrice;
    private String badgeText;
    private String badgeVariant;
    private List<String> variants;
}
