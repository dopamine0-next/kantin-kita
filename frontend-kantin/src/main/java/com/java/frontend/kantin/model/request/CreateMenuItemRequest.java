package com.java.frontend.kantin.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class CreateMenuItemRequest {

    @JsonProperty
    private String name;

    @JsonProperty
    private String description;

    @JsonProperty
    private Double price;

    @JsonProperty
    private String imageUrl;

    @JsonProperty
    private String category;

    @JsonProperty
    private String prepTime;

    @JsonProperty
    private Double originalPrice;

    @JsonProperty
    private String badgeText;

    @JsonProperty
    private String badgeVariant;

    @JsonProperty
    private List<String> variants;

    public CreateMenuItemRequest() {
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

    public String getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(String prepTime) {
        this.prepTime = prepTime;
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
}
