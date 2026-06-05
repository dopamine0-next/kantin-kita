package com.kantin.frontend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class VendorTopItemResponse {
    public String menuItemId;
    public String name;
    public String imageUrl;
    public Long totalQuantity;
    public Double totalRevenue;

    public VendorTopItemResponse() {}
}
