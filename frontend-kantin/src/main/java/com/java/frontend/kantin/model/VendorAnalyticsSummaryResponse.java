package com.java.frontend.kantin.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class VendorAnalyticsSummaryResponse {

    @JsonProperty
    private Integer todayOrders;

    @JsonProperty
    private Double todayRevenue;

    @JsonProperty
    private Integer pendingOrders;

    @JsonProperty
    private Integer processingOrders;

    @JsonProperty
    private Double averageRating;

    public VendorAnalyticsSummaryResponse() {
    }

    public Integer getTodayOrders() {
        return todayOrders;
    }

    public void setTodayOrders(Integer todayOrders) {
        this.todayOrders = todayOrders;
    }

    public Double getTodayRevenue() {
        return todayRevenue;
    }

    public void setTodayRevenue(Double todayRevenue) {
        this.todayRevenue = todayRevenue;
    }

    public Integer getPendingOrders() {
        return pendingOrders;
    }

    public void setPendingOrders(Integer pendingOrders) {
        this.pendingOrders = pendingOrders;
    }

    public Integer getProcessingOrders() {
        return processingOrders;
    }

    public void setProcessingOrders(Integer processingOrders) {
        this.processingOrders = processingOrders;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }
}
