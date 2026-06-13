package com.java.frontend.kantin.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class VendorRestaurantResponse {

    @JsonProperty
    private String id;

    @JsonProperty
    private String name;

    @JsonProperty("restaurant_category")
    private RestaurantCategoryResponse restaurantCategory;

    @JsonProperty
    private Double rating;

    @JsonProperty
    private Integer ratingCount;

    @JsonProperty
    private Integer reviewsCount;

    @JsonProperty
    private Boolean isOpen;

    @JsonProperty
    private String imageUrl;

    @JsonProperty
    private String bannerImageUrl;

    @JsonProperty
    private String address;

    @JsonProperty
    private String operationalHours;

    @JsonProperty
    private String locationId;

    @JsonProperty
    private String locationName;

    @JsonProperty
    private Double cheapestPrice;

    @JsonProperty
    private List<String> promos;

    public VendorRestaurantResponse() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public RestaurantCategoryResponse getRestaurantCategory() {
        return restaurantCategory;
    }

    public void setRestaurantCategory(RestaurantCategoryResponse restaurantCategory) {
        this.restaurantCategory = restaurantCategory;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getRatingCount() {
        return ratingCount;
    }

    public void setRatingCount(Integer ratingCount) {
        this.ratingCount = ratingCount;
    }

    public Integer getReviewsCount() {
        return reviewsCount;
    }

    public void setReviewsCount(Integer reviewsCount) {
        this.reviewsCount = reviewsCount;
    }

    public Boolean getIsOpen() {
        return isOpen;
    }

    public void setIsOpen(Boolean isOpen) {
        this.isOpen = isOpen;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getBannerImageUrl() {
        return bannerImageUrl;
    }

    public void setBannerImageUrl(String bannerImageUrl) {
        this.bannerImageUrl = bannerImageUrl;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getOperationalHours() {
        return operationalHours;
    }

    public void setOperationalHours(String operationalHours) {
        this.operationalHours = operationalHours;
    }

    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(String locationId) {
        this.locationId = locationId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public Double getCheapestPrice() {
        return cheapestPrice;
    }

    public void setCheapestPrice(Double cheapestPrice) {
        this.cheapestPrice = cheapestPrice;
    }

    public List<String> getPromos() {
        return promos;
    }

    public void setPromos(List<String> promos) {
        this.promos = promos;
    }
}
