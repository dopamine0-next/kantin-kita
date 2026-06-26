package com.java.frontend.kantin.model;

import com.google.gson.annotations.SerializedName;

public class VendorReview {

    private String id;

    @SerializedName("user_id")
    private String userId;

    @SerializedName("user_name")
    private String userName;

    @SerializedName("restaurant_id")
    private String restaurantId;

    @SerializedName("order_id")
    private String orderId;

    private Integer rating;

    @SerializedName("created_at")
    private String createdAt;

    public String getId() { return id; }
    public String getUserId() { return userId; }
    public String getUserName() { return userName; }
    public String getRestaurantId() { return restaurantId; }
    public String getOrderId() { return orderId; }
    public Integer getRating() { return rating; }
    public String getCreatedAt() { return createdAt; }
}
