package com.java.frontend.kantin.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class VendorOrderTrendResponse {

    @JsonProperty
    private String date;

    @JsonProperty
    private Integer orderCount;

    @JsonProperty
    private Double totalRevenue;

    public VendorOrderTrendResponse() {
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getOrderCount() {
        return orderCount;
    }

    public void setOrderCount(Integer orderCount) {
        this.orderCount = orderCount;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
