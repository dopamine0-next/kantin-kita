package com.java.frontend.admin.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.java.frontend.admin.config.ApiClient;
import com.java.frontend.admin.model.AdminLocation;

import java.lang.reflect.Type;
import java.util.List;

public class LocationService {

    private static final Gson gson = new Gson();

    public static List<AdminLocation> findAll() {
        String json = ApiClient.get("/admin/locations");
        Type type = new TypeToken<List<AdminLocation>>() {}.getType();
        return gson.fromJson(json, type);
    }

    public static AdminLocation findById(String id) {
        String json = ApiClient.get("/admin/locations/" + id);
        return gson.fromJson(json, AdminLocation.class);
    }

    public static AdminLocation create(String jsonBody) {
        String json = ApiClient.post("/admin/locations", jsonBody);
        return gson.fromJson(json, AdminLocation.class);
    }

    public static AdminLocation update(String id, String jsonBody) {
        String json = ApiClient.put("/admin/locations/" + id, jsonBody);
        return gson.fromJson(json, AdminLocation.class);
    }

    public static void delete(String id) {
        ApiClient.delete("/admin/locations/" + id);
    }

}
