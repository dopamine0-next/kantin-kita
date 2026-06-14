package com.java.frontend.kantin.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.java.frontend.kantin.config.ApiClient;
import com.java.frontend.kantin.model.ComboItem;
import com.java.frontend.kantin.model.VendorRestaurant;

import java.lang.reflect.Type;
import java.util.List;

public class RestaurantService {

    private static final Gson gson = new Gson();

    public static VendorRestaurant getRestaurant(String id) {
        String json = ApiClient.get("/vendor/restaurants/" + id);
        return gson.fromJson(json, VendorRestaurant.class);
    }

    public static VendorRestaurant updateRestaurant(String id, String jsonBody) {
        String json = ApiClient.put("/vendor/restaurants/" + id, jsonBody);
        return gson.fromJson(json, VendorRestaurant.class);
    }

    public static VendorRestaurant toggleStatus(String id) {
        String json = ApiClient.patch("/vendor/restaurants/" + id + "/status", null);
        return gson.fromJson(json, VendorRestaurant.class);
    }

    public static VendorRestaurant updateHours(String id, String operationalHours) {
        String json = ApiClient.put("/vendor/restaurants/" + id + "/hours",
                "{\"operationalHours\":\"" + operationalHours + "\"}");
        return gson.fromJson(json, VendorRestaurant.class);
    }

    public static List<ComboItem> getMenuCategories() {
        String json = ApiClient.get("/categories");
        Type type = new TypeToken<List<ComboItem>>() {}.getType();
        return gson.fromJson(json, type);
    }
}
