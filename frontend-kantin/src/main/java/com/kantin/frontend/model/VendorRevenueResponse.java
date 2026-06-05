package com.kantin.frontend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class VendorRevenueResponse {
    public Double totalRevenue;
    public Integer totalOrders;
    public List<RevenueBreakdown> breakdown;

    public VendorRevenueResponse() {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class RevenueBreakdown {
        public String date;
        public Double revenue;
        public Integer orderCount;
        public RevenueBreakdown() {}
    }
}
