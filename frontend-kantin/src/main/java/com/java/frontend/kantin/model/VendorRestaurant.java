package com.java.frontend.kantin.model;

public class VendorRestaurant {

    private String id;
    private String name;
    private RestaurantCategoryInfo restaurantCategory;
    private Double rating;
    private Integer ratingCount;
    private Integer reviewsCount;
    private Boolean isOpen;
    private String imageUrl;
    private String bannerImageUrl;
    private String address;
    private String operationalHours;
    private String locationId;
    private String locationName;
    private Double cheapestPrice;

    public String getId() { return id; }
    public String getName() { return name; }
    public RestaurantCategoryInfo getRestaurantCategory() { return restaurantCategory; }
    public Double getRating() { return rating; }
    public Integer getRatingCount() { return ratingCount; }
    public Integer getReviewsCount() { return reviewsCount; }
    public Boolean getIsOpen() { return isOpen; }
    public String getImageUrl() { return imageUrl; }
    public String getBannerImageUrl() { return bannerImageUrl; }
    public String getAddress() { return address; }
    public String getOperationalHours() { return operationalHours; }
    public String getLocationId() { return locationId; }
    public String getLocationName() { return locationName; }
    public Double getCheapestPrice() { return cheapestPrice; }

    public static class RestaurantCategoryInfo {
        private String id;
        private String name;

        public String getId() { return id; }
        public String getName() { return name; }
    }
}
