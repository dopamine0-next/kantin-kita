package com.java.frontend.admin.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.java.frontend.admin.config.ApiClient;
import com.java.frontend.admin.model.AdminVoucher;

import java.lang.reflect.Type;
import java.util.List;

public class VoucherService {

    private static final Gson gson = new Gson();

    public static List<AdminVoucher> findAll() {
        String json = ApiClient.get("/admin/vouchers");
        Type type = new TypeToken<List<AdminVoucher>>() {}.getType();
        return gson.fromJson(json, type);
    }

    public static AdminVoucher findById(String id) {
        String json = ApiClient.get("/admin/vouchers/" + id);
        return gson.fromJson(json, AdminVoucher.class);
    }

    public static AdminVoucher create(String jsonBody) {
        String json = ApiClient.post("/admin/vouchers", jsonBody);
        return gson.fromJson(json, AdminVoucher.class);
    }

    public static AdminVoucher update(String id, String jsonBody) {
        String json = ApiClient.put("/admin/vouchers/" + id, jsonBody);
        return gson.fromJson(json, AdminVoucher.class);
    }

    public static AdminVoucher toggleActive(String id) {
        String json = ApiClient.patch("/admin/vouchers/" + id + "/toggle", "");
        return gson.fromJson(json, AdminVoucher.class);
    }

    public static void delete(String id) {
        ApiClient.delete("/admin/vouchers/" + id);
    }

}
