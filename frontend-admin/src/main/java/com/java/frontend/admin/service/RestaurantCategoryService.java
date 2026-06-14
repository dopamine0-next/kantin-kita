package com.java.frontend.admin.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.java.frontend.admin.config.ApiClient;
import com.java.frontend.admin.model.AdminRestaurantCategory;

import java.lang.reflect.Type;
import java.util.List;

public class RestaurantCategoryService {

    private static final Gson gson = new Gson();

    public static List<AdminRestaurantCategory> findAll() {
        String json = ApiClient.get("/admin/restaurant-categories");
        Type type = new TypeToken<List<AdminRestaurantCategory>>() {}.getType();
        return gson.fromJson(json, type);
    }

    public static AdminRestaurantCategory findById(String id) {
        String json = ApiClient.get("/admin/restaurant-categories/" + id);
        return gson.fromJson(json, AdminRestaurantCategory.class);
    }

    public static AdminRestaurantCategory create(String jsonBody) {
        String json = ApiClient.post("/admin/restaurant-categories", jsonBody);
        return gson.fromJson(json, AdminRestaurantCategory.class);
    }

    public static AdminRestaurantCategory update(String id, String jsonBody) {
        String json = ApiClient.put("/admin/restaurant-categories/" + id, jsonBody);
        return gson.fromJson(json, AdminRestaurantCategory.class);
    }

    public static void delete(String id) {
        ApiClient.delete("/admin/restaurant-categories/" + id);
    }

}
