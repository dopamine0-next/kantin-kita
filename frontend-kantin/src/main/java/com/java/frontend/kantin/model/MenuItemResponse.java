package com.java.frontend.kantin.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class MenuItemResponse {

    @JsonProperty
    private String id;

    @JsonProperty
    private String name;

    @JsonProperty
    private String description;

    @JsonProperty
    private Double price;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty
    private String category;

    @JsonProperty
    private Double rating;

    @JsonProperty("rating_count")
    private Integer ratingCount;

    @JsonProperty("is_popular")
    private Boolean isPopular;

    @JsonProperty("prep_time")
    private String prepTime;

    @JsonProperty
    private String stall;

    @JsonProperty("restaurant_id")
    private String restaurantId;

    @JsonProperty
    private Double originalPrice;

    @JsonProperty
    private String badgeText;

    @JsonProperty
    private String badgeVariant;

    @JsonProperty
    private List<String> variants;

    @JsonProperty
    private List<MenuCustomizationResponse> customizations;

    public MenuItemResponse() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

    public Boolean getIsPopular() {
        return isPopular;
    }

    public void setIsPopular(Boolean isPopular) {
        this.isPopular = isPopular;
    }

    public String getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(String prepTime) {
        this.prepTime = prepTime;
    }

    public String getStall() {
        return stall;
    }

    public void setStall(String stall) {
        this.stall = stall;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public String getBadgeText() {
        return badgeText;
    }

    public void setBadgeText(String badgeText) {
        this.badgeText = badgeText;
    }

    public String getBadgeVariant() {
        return badgeVariant;
    }

    public void setBadgeVariant(String badgeVariant) {
        this.badgeVariant = badgeVariant;
    }

    public List<String> getVariants() {
        return variants;
    }

    public void setVariants(List<String> variants) {
        this.variants = variants;
    }

    public List<MenuCustomizationResponse> getCustomizations() {
        return customizations;
    }

    public void setCustomizations(List<MenuCustomizationResponse> customizations) {
        this.customizations = customizations;
    }
}
