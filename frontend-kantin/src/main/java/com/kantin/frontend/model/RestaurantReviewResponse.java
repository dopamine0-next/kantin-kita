package com.kantin.frontend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RestaurantReviewResponse {
    public String id;
    @JsonProperty("user_id") public String userId;
    @JsonProperty("user_name") public String userName;
    @JsonProperty("restaurant_id") public String restaurantId;
    public Integer rating;
    @JsonProperty("created_at") public String createdAt;

    public RestaurantReviewResponse() {}
}
