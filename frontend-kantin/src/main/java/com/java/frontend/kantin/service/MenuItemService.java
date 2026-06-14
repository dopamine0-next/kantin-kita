package com.java.frontend.kantin.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.java.frontend.kantin.config.ApiClient;
import com.java.frontend.kantin.model.VendorMenuItem;

import java.lang.reflect.Type;
import java.util.List;

public class MenuItemService {

    private static final Gson gson = new Gson();

    public static List<VendorMenuItem> listMenus(String restaurantId) {
        String json = ApiClient.get("/vendor/restaurants/" + restaurantId + "/menus");
        Type type = new TypeToken<List<VendorMenuItem>>() {}.getType();
        return gson.fromJson(json, type);
    }

    public static VendorMenuItem create(String restaurantId, String jsonBody) {
        String json = ApiClient.post("/vendor/restaurants/" + restaurantId + "/menus", jsonBody);
        return gson.fromJson(json, VendorMenuItem.class);
    }

    public static VendorMenuItem update(String menuId, String jsonBody) {
        String json = ApiClient.put("/vendor/menus/" + menuId, jsonBody);
        return gson.fromJson(json, VendorMenuItem.class);
    }

    public static void delete(String menuId) {
        ApiClient.delete("/vendor/menus/" + menuId);
    }

    public static VendorMenuItem togglePopular(String menuId) {
        String json = ApiClient.patch("/vendor/menus/" + menuId + "/popular", null);
        return gson.fromJson(json, VendorMenuItem.class);
    }
}
