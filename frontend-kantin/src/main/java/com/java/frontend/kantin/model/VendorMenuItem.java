package com.java.frontend.kantin.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class VendorMenuItem {

    private String id;
    private String name;
    private String description;
    private Double price;

    @SerializedName("original_price")
    private Double originalPrice;

    @SerializedName("image_url")
    private String imageUrl;

    private String category;

    @SerializedName("category_id")
    private String categoryId;

    private Double rating;

    @SerializedName("rating_count")
    private Integer ratingCount;

    @SerializedName("is_popular")
    private Boolean isPopular;

    private String stall;

    @SerializedName("restaurant_id")
    private String restaurantId;

    private List<MenuCustomization> customizations;

    public String getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public Double getPrice() { return price; }
    public Double getOriginalPrice() { return originalPrice; }
    public String getImageUrl() { return imageUrl; }
    public String getCategory() { return category; }
    public String getCategoryId() { return categoryId; }
    public Double getRating() { return rating; }
    public Integer getRatingCount() { return ratingCount; }
    public Boolean getIsPopular() { return isPopular; }
    public String getStall() { return stall; }
    public String getRestaurantId() { return restaurantId; }
    public List<MenuCustomization> getCustomizations() { return customizations; }

    public static class MenuCustomization {
        private String id;
        private String title;
        private String type;

        @SerializedName("is_required")
        private Boolean isRequired;

        private List<CustomizationOption> options;

        public String getId() { return id; }
        public String getTitle() { return title; }
        public String getType() { return type; }
        public Boolean getIsRequired() { return isRequired; }
        public List<CustomizationOption> getOptions() { return options; }
    }

    public static class CustomizationOption {
        private String id;
        private String label;
        private Double price;

        public String getId() { return id; }
        public String getLabel() { return label; }
        public Double getPrice() { return price; }
    }
}
