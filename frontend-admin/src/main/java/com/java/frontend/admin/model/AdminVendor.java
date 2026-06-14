package com.java.frontend.admin.model;

import java.util.List;

public class AdminVendor {

    private String id;
    private String name;
    private String email;
    private String phone;
    private String avatarUrl;
    private String createdAt;
    private List<VendorRestaurantItem> restaurants;

    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getAvatarUrl() { return avatarUrl; }
    public String getCreatedAt() { return createdAt; }
    public List<VendorRestaurantItem> getRestaurants() { return restaurants; }

    public static class VendorRestaurantItem {
        private String id;
        private String name;
        public String getId() { return id; }
        public String getName() { return name; }
    }
}
