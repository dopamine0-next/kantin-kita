package com.kantin.frontend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class VendorAnalyticsSummaryResponse {
    public Integer todayOrders;
    public Double todayRevenue;
    public Integer pendingOrders;
    public Integer processingOrders;
    public Double averageRating;

    public VendorAnalyticsSummaryResponse() {}
}
