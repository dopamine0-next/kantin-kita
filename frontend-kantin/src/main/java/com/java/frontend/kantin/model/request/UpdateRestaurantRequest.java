package com.java.frontend.kantin.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdateRestaurantRequest {

    @JsonProperty
    private String name;

    @JsonProperty
    private String cuisine;

    @JsonProperty
    private String imageUrl;

    @JsonProperty
    private String bannerImageUrl;

    @JsonProperty
    private String address;

    @JsonProperty
    private String promoText;

    public UpdateRestaurantRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
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

    public String getPromoText() {
        return promoText;
    }

    public void setPromoText(String promoText) {
        this.promoText = promoText;
    }
}
