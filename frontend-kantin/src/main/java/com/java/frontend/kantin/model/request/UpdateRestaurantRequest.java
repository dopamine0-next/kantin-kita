package com.java.frontend.kantin.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdateRestaurantRequest {

    @JsonProperty
    private String name;

    @JsonProperty("restaurant_category_id")
    private String restaurantCategoryId;

    @JsonProperty
    private String imageUrl;

    @JsonProperty
    private String bannerImageUrl;

    @JsonProperty
    private String address;

    public UpdateRestaurantRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRestaurantCategoryId() {
        return restaurantCategoryId;
    }

    public void setRestaurantCategoryId(String restaurantCategoryId) {
        this.restaurantCategoryId = restaurantCategoryId;
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
}
