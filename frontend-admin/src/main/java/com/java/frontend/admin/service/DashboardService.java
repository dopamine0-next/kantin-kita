package com.java.frontend.admin.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.java.frontend.admin.config.ApiClient;
import com.java.frontend.admin.model.AdminDashboardSummary;
import com.java.frontend.admin.model.AdminRestaurantRanking;

import java.lang.reflect.Type;
import java.util.List;

public class DashboardService {

    private static final Gson gson = new Gson();

    public static AdminDashboardSummary getSummary() {
        String json = ApiClient.get("/admin/dashboard/summary");
        return gson.fromJson(json, AdminDashboardSummary.class);
    }

    public static List<AdminRestaurantRanking> getRankings(String sortBy, int limit) {
        String json = ApiClient.get("/admin/dashboard/restaurant-rankings?sortBy=" + sortBy + "&limit=" + limit);
        Type type = new TypeToken<List<AdminRestaurantRanking>>() {}.getType();
        return gson.fromJson(json, type);
    }
}
