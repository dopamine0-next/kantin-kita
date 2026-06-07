package com.java.frontend.kantin.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class VendorProfile {

    @JsonProperty
    private String id;

    @JsonProperty
    private String name;

    @JsonProperty
    private String email;

    @JsonProperty
    private String phone;

    @JsonProperty
    private String avatarUrl;

    @JsonProperty
    private List<VendorRestaurantItem> restaurants;

    public VendorProfile() {
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public List<VendorRestaurantItem> getRestaurants() {
        return restaurants;
    }

    public void setRestaurants(List<VendorRestaurantItem> restaurants) {
        this.restaurants = restaurants;
    }

    public static class VendorRestaurantItem {

        @JsonProperty
        private String id;

        @JsonProperty
        private String name;

        @JsonProperty
        private String imageUrl;

        @JsonProperty
        private Boolean isOpen;

        public VendorRestaurantItem() {
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

        public String getImageUrl() {
            return imageUrl;
        }

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }

        public Boolean getIsOpen() {
            return isOpen;
        }

        public void setIsOpen(Boolean isOpen) {
            this.isOpen = isOpen;
        }
    }
}
