package com.java.frontend.admin.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.java.frontend.admin.config.ApiClient;
import com.java.frontend.admin.model.AdminBanner;

import java.lang.reflect.Type;
import java.util.List;

public class BannerService {

    private static final Gson gson = new Gson();

    public static List<AdminBanner> findAll() {
        String json = ApiClient.get("/admin/banners");
        Type type = new TypeToken<List<AdminBanner>>() {}.getType();
        return gson.fromJson(json, type);
    }

    public static AdminBanner findById(String id) {
        String json = ApiClient.get("/admin/banners/" + id);
        return gson.fromJson(json, AdminBanner.class);
    }

    public static AdminBanner create(String jsonBody) {
        String json = ApiClient.post("/admin/banners", jsonBody);
        return gson.fromJson(json, AdminBanner.class);
    }

    public static AdminBanner update(String id, String jsonBody) {
        String json = ApiClient.put("/admin/banners/" + id, jsonBody);
        return gson.fromJson(json, AdminBanner.class);
    }

    public static AdminBanner toggleActive(String id) {
        String json = ApiClient.patch("/admin/banners/" + id + "/toggle", "");
        return gson.fromJson(json, AdminBanner.class);
    }

    public static void delete(String id) {
        ApiClient.delete("/admin/banners/" + id);
    }

}
