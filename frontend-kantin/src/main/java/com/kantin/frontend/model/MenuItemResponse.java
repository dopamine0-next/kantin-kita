package com.kantin.frontend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MenuItemResponse {
    public String id;
    public String name;
    public String description;
    public Double price;
    @JsonProperty("image_url") public String imageUrl;
    public String category;
    public Double rating;
    @JsonProperty("rating_count") public Integer ratingCount;
    @JsonProperty("sales_count") public String salesCount;
    @JsonProperty("is_popular") public Boolean isPopular;
    @JsonProperty("prep_time") public String prepTime;
    @JsonProperty("restaurant_id") public String restaurantId;
    public List<String> variants;
    public List<Customization> customizations;

    public MenuItemResponse() {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Customization {
        public String title;
        public String type;
        public List<CustomizationOption> options;
        public Boolean required;

        public Customization() {}

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class CustomizationOption {
            public String label;
            public Double price;
            public CustomizationOption() {}
        }
    }
}
