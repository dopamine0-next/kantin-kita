package com.java.frontend.kantin.model;

import java.util.List;

public class VendorLoginResponse {

    private String token;
    private VendorProfile vendor;

    public String getToken() { return token; }
    public VendorProfile getVendor() { return vendor; }

    public static class VendorProfile {
        private String id;
        private String name;
        private String email;
        private String phone;
        private String avatarUrl;
        private List<VendorRestaurantItem> restaurants;

        public String getId() { return id; }
        public String getName() { return name; }
        public String getEmail() { return email; }
        public String getPhone() { return phone; }
        public String getAvatarUrl() { return avatarUrl; }
        public List<VendorRestaurantItem> getRestaurants() { return restaurants; }
    }

    public static class VendorRestaurantItem {
        private String id;
        private String name;
        private String imageUrl;
        private Boolean isOpen;

        public String getId() { return id; }
        public String getName() { return name; }
        public String getImageUrl() { return imageUrl; }
        public Boolean getIsOpen() { return isOpen; }

        @Override
        public String toString() {
            return name != null ? name : "";
        }
    }
}
