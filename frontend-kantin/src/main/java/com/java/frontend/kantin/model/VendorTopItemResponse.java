package com.java.frontend.kantin.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class VendorTopItemResponse {

    @JsonProperty
    private String menuItemId;

    @JsonProperty
    private String name;

    @JsonProperty
    private String imageUrl;

    @JsonProperty
    private Long totalQuantity;

    @JsonProperty
    private Double totalRevenue;

    public VendorTopItemResponse() {
    }

    public String getMenuItemId() {
        return menuItemId;
    }

    public void setMenuItemId(String menuItemId) {
        this.menuItemId = menuItemId;
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

    public Long getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Long totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
