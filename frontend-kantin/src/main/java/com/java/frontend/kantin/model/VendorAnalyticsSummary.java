package com.java.frontend.kantin.model;

public class VendorAnalyticsSummary {

    private Integer todayOrders;
    private Double todayRevenue;
    private Integer pendingOrders;
    private Integer processingOrders;
    private Double averageRating;

    public Integer getTodayOrders() { return todayOrders; }
    public Double getTodayRevenue() { return todayRevenue; }
    public Integer getPendingOrders() { return pendingOrders; }
    public Integer getProcessingOrders() { return processingOrders; }
    public Double getAverageRating() { return averageRating; }
}
