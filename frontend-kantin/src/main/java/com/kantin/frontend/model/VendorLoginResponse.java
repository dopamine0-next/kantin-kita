package com.kantin.frontend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class VendorLoginResponse {
    public String token;
    public VendorProfile vendor;

    public VendorLoginResponse() {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class VendorProfile {
        public String id;
        public String name;
        public String email;
        public String phone;
        public String avatarUrl;
        public List<VendorRestaurant> restaurants;

        public VendorProfile() {}

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class VendorRestaurant {
            public String id;
            public String name;
            public String imageUrl;
            public Boolean isOpen;

            public VendorRestaurant() {}
        }
    }
}
