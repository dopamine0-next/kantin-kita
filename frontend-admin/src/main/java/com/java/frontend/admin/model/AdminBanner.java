package com.java.frontend.admin.model;

public class AdminBanner {

    private String id;
    private String imageUrl;
    private String title;
    private String linkUrl;
    private Boolean isActive;
    private LocationInfo location;

    public String getId() { return id; }
    public String getImageUrl() { return imageUrl; }
    public String getTitle() { return title; }
    public String getLinkUrl() { return linkUrl; }
    public Boolean getIsActive() { return isActive; }
    public LocationInfo getLocation() { return location; }

    public static class LocationInfo {
        private String id;
        private String name;
        public String getId() { return id; }
        public String getName() { return name; }
    }
}
