package com.example.demo.dto.response;

import com.example.demo.entity.RestaurantReview;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RestaurantReviewResponse {

    private String id;

    @JsonProperty("user_id")
    private String userId;

    @JsonProperty("user_name")
    private String userName;

    @JsonProperty("restaurant_id")
    private String restaurantId;

    @JsonProperty("order_id")
    private String orderId;

    private Integer rating;

    @JsonProperty("created_at")
    private String createdAt;

    public static RestaurantReviewResponse from(RestaurantReview review) {
        return RestaurantReviewResponse.builder()
                .id(review.getId())
                .userId(review.getUser().getId())
                .userName(review.getUser().getName())
                .restaurantId(review.getRestaurant().getId())
                .orderId(review.getOrder().getId())
                .rating(review.getRating())
                .createdAt(review.getCreatedAt().toString())
                .build();
    }
}
