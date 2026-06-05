package com.example.demo.dto.response;

import com.example.demo.entity.MenuItemReview;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MenuItemReviewResponse {

    private String id;

    @JsonProperty("user_id")
    private String userId;

    @JsonProperty("user_name")
    private String userName;

    @JsonProperty("menu_item_id")
    private String menuItemId;

    @JsonProperty("menu_item_name")
    private String menuItemName;

    @JsonProperty("order_id")
    private String orderId;

    private Integer rating;

    @JsonProperty("created_at")
    private String createdAt;

    public static MenuItemReviewResponse from(MenuItemReview review) {
        return MenuItemReviewResponse.builder()
                .id(review.getId())
                .userId(review.getUser().getId())
                .userName(review.getUser().getName())
                .menuItemId(review.getMenuItem().getId())
                .menuItemName(review.getMenuItem().getName())
                .orderId(review.getOrder().getId())
                .rating(review.getRating())
                .createdAt(review.getCreatedAt().toString())
                .build();
    }
}
