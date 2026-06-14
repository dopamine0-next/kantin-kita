package com.java.frontend.admin.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.java.frontend.admin.config.ApiClient;
import com.java.frontend.admin.model.AdminMenuCategory;

import java.lang.reflect.Type;
import java.util.List;

public class MenuCategoryService {

    private static final Gson gson = new Gson();

    public static List<AdminMenuCategory> findAll() {
        String json = ApiClient.get("/admin/menu-categories");
        Type type = new TypeToken<List<AdminMenuCategory>>() {}.getType();
        return gson.fromJson(json, type);
    }

    public static AdminMenuCategory findById(String id) {
        String json = ApiClient.get("/admin/menu-categories/" + id);
        return gson.fromJson(json, AdminMenuCategory.class);
    }

    public static AdminMenuCategory create(String jsonBody) {
        String json = ApiClient.post("/admin/menu-categories", jsonBody);
        return gson.fromJson(json, AdminMenuCategory.class);
    }

    public static AdminMenuCategory update(String id, String jsonBody) {
        String json = ApiClient.put("/admin/menu-categories/" + id, jsonBody);
        return gson.fromJson(json, AdminMenuCategory.class);
    }

    public static void delete(String id) {
        ApiClient.delete("/admin/menu-categories/" + id);
    }

}
