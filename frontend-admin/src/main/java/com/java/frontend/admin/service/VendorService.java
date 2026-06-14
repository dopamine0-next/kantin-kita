package com.java.frontend.admin.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.java.frontend.admin.config.ApiClient;
import com.java.frontend.admin.model.AdminVendor;

import java.lang.reflect.Type;
import java.util.List;

public class VendorService {

    private static final Gson gson = new Gson();

    public static List<AdminVendor> findAll(String q) {
        StringBuilder path = new StringBuilder("/admin/vendors?");
        if (q != null && !q.isBlank()) path.append("q=").append(q);

        String json = ApiClient.get(path.toString());
        Type type = new TypeToken<List<AdminVendor>>() {}.getType();
        return gson.fromJson(json, type);
    }

    public static AdminVendor findById(String id) {
        String json = ApiClient.get("/admin/vendors/" + id);
        return gson.fromJson(json, AdminVendor.class);
    }

    public static AdminVendor create(String jsonBody) {
        String json = ApiClient.post("/admin/vendors", jsonBody);
        return gson.fromJson(json, AdminVendor.class);
    }

    public static AdminVendor update(String id, String jsonBody) {
        String json = ApiClient.put("/admin/vendors/" + id, jsonBody);
        return gson.fromJson(json, AdminVendor.class);
    }

    public static void delete(String id) {
        ApiClient.delete("/admin/vendors/" + id);
    }

}
