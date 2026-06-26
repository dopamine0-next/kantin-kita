package com.java.frontend.admin.model;

public class AdminRestaurantRanking {

    private String restaurantId;
    private String restaurantName;
    private long orderCount;
    private double revenue;
    private double rating;
    private int ratingCount;

    public String getRestaurantId() { return restaurantId; }
    public String getRestaurantName() { return restaurantName; }
    public long getOrderCount() { return orderCount; }
    public double getRevenue() { return revenue; }
    public double getRating() { return rating; }
    public int getRatingCount() { return ratingCount; }
}
