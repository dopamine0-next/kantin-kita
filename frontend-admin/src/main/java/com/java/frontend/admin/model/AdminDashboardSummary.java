package com.java.frontend.admin.model;

public class AdminDashboardSummary {

    private long totalRestaurants;
    private long totalVendors;
    private long totalUsers;
    private long totalOrders;
    private int todayOrders;
    private double todayRevenue;
    private double totalRevenue;
    private double averageRating;

    public long getTotalRestaurants() { return totalRestaurants; }
    public long getTotalVendors() { return totalVendors; }
    public long getTotalUsers() { return totalUsers; }
    public long getTotalOrders() { return totalOrders; }
    public int getTodayOrders() { return todayOrders; }
    public double getTodayRevenue() { return todayRevenue; }
    public double getTotalRevenue() { return totalRevenue; }
    public double getAverageRating() { return averageRating; }
}
