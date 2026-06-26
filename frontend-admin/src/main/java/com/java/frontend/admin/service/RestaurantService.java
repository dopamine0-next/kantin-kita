package com.java.frontend.admin.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.java.frontend.admin.config.ApiClient;
import com.java.frontend.admin.model.AdminRestaurant;

import java.lang.reflect.Type;
import java.util.List;

public class RestaurantService {

    private static final Gson gson = new Gson();

    public static List<AdminRestaurant> findAll(String q, String locationId, String categoryId, String vendorId, Boolean isOpen) {
        StringBuilder path = new StringBuilder("/admin/restaurants?");
        if (q != null && !q.isBlank()) path.append("q=").append(q).append("&");
        if (locationId != null) path.append("locationId=").append(locationId).append("&");
        if (categoryId != null) path.append("categoryId=").append(categoryId).append("&");
        if (vendorId != null) path.append("vendorId=").append(vendorId).append("&");
        if (isOpen != null) path.append("isOpen=").append(isOpen);

        String json = ApiClient.get(path.toString());
        Type type = new TypeToken<List<AdminRestaurant>>() {}.getType();
        return gson.fromJson(json, type);
    }

    public static AdminRestaurant findById(String id) {
        String json = ApiClient.get("/admin/restaurants/" + id);
        return gson.fromJson(json, AdminRestaurant.class);
    }

    public static AdminRestaurant create(String jsonBody) {
        String json = ApiClient.post("/admin/restaurants", jsonBody);
        return gson.fromJson(json, AdminRestaurant.class);
    }

    public static AdminRestaurant update(String id, String jsonBody) {
        String json = ApiClient.put("/admin/restaurants/" + id, jsonBody);
        return gson.fromJson(json, AdminRestaurant.class);
    }

    public static void delete(String id) {
        ApiClient.delete("/admin/restaurants/" + id);
    }

}
