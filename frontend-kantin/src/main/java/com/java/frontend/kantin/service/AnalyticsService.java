package com.java.frontend.kantin.service;

import com.google.gson.Gson;
import com.java.frontend.kantin.config.ApiClient;
import com.java.frontend.kantin.model.VendorAnalyticsSummary;

public class AnalyticsService {

    private static final Gson gson = new Gson();

    public static VendorAnalyticsSummary getSummary(String restaurantId) {
        String json = ApiClient.get("/vendor/restaurants/" + restaurantId + "/analytics/summary");
        return gson.fromJson(json, VendorAnalyticsSummary.class);
    }
}
