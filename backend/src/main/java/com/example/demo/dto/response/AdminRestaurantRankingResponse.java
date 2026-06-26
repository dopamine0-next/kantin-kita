package com.example.demo.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminRestaurantRankingResponse {

    private String restaurantId;
    private String restaurantName;
    private Long orderCount;
    private Double revenue;
    private Double rating;
    private Integer ratingCount;
}
