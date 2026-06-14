package com.java.frontend.admin.model;

public class AdminRestaurant {

    private String id;
    private String name;
    private CategoryInfo category;
    private VendorInfo vendor;
    private LocationInfo location;
    private Boolean isOpen;
    private String imageUrl;
    private String bannerImageUrl;
    private String address;
    private String operationalHours;
    private Double cheapestPrice;
    private Double rating;
    private Integer ratingCount;

    public String getId() { return id; }
    public String getName() { return name; }
    public CategoryInfo getCategory() { return category; }
    public VendorInfo getVendor() { return vendor; }
    public LocationInfo getLocation() { return location; }
    public Boolean getIsOpen() { return isOpen; }
    public String getImageUrl() { return imageUrl; }
    public String getBannerImageUrl() { return bannerImageUrl; }
    public String getAddress() { return address; }
    public String getOperationalHours() { return operationalHours; }
    public Double getCheapestPrice() { return cheapestPrice; }
    public Double getRating() { return rating; }
    public Integer getRatingCount() { return ratingCount; }

    public static class CategoryInfo {
        private String id;
        private String name;
        public String getId() { return id; }
        public String getName() { return name; }
    }

    public static class VendorInfo {
        private String id;
        private String name;
        public String getId() { return id; }
        public String getName() { return name; }
    }

    public static class LocationInfo {
        private String id;
        private String name;
        private String address;
        public String getId() { return id; }
        public String getName() { return name; }
    }
}
