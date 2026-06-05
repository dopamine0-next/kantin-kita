package com.kantin.frontend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class VendorRestaurantResponse {
    public String id;
    public String name;
    public String cuisine;
    public Double rating;
    public Integer ratingCount;
    public String reviewsCount;
    public Boolean isOpen;
    public String promoText;
    public String imageUrl;
    public String bannerImageUrl;
    public String address;
    public String operationalHours;
    public String locationId;
    public String locationName;
    public Double cheapestPrice;
    public Boolean isInstant;
    public List<String> promos;

    public VendorRestaurantResponse() {}
}
