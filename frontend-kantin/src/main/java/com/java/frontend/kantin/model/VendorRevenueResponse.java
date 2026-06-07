package com.java.frontend.kantin.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class VendorRevenueResponse {

    @JsonProperty
    private Double totalRevenue;

    @JsonProperty
    private Integer totalOrders;

    @JsonProperty
    private List<RevenueBreakdown> breakdown;

    public VendorRevenueResponse() {
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Integer getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Integer totalOrders) {
        this.totalOrders = totalOrders;
    }

    public List<RevenueBreakdown> getBreakdown() {
        return breakdown;
    }

    public void setBreakdown(List<RevenueBreakdown> breakdown) {
        this.breakdown = breakdown;
    }

    public static class RevenueBreakdown {

        @JsonProperty
        private String date;

        @JsonProperty
        private Double revenue;

        @JsonProperty
        private Integer orderCount;

        public RevenueBreakdown() {
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public Double getRevenue() {
            return revenue;
        }

        public void setRevenue(Double revenue) {
            this.revenue = revenue;
        }

        public Integer getOrderCount() {
            return orderCount;
        }

        public void setOrderCount(Integer orderCount) {
            this.orderCount = orderCount;
        }
    }
}
