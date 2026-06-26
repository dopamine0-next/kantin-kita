package com.java.frontend.kantin.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.java.frontend.kantin.config.ApiClient;
import com.java.frontend.kantin.model.VendorOrder;

import java.lang.reflect.Type;
import java.util.List;

public class OrderService {

    private static final Gson gson = new Gson();

    public static List<VendorOrder> listOrders(String restaurantId, String status, String dateFrom, String dateTo) {
        StringBuilder path = new StringBuilder("/vendor/restaurants/" + restaurantId + "/orders?");
        if (status != null && !status.isBlank()) path.append("status=").append(status).append("&");
        if (dateFrom != null && !dateFrom.isBlank()) path.append("dateFrom=").append(dateFrom).append("&");
        if (dateTo != null && !dateTo.isBlank()) path.append("dateTo=").append(dateTo);
        String json = ApiClient.get(path.toString());
        Type type = new TypeToken<List<VendorOrder>>() {}.getType();
        return gson.fromJson(json, type);
    }

    public static VendorOrder updateStatus(String orderId, String status) {
        String json = ApiClient.patch("/vendor/orders/" + orderId + "/status",
                "{\"status\":\"" + status + "\"}");
        return gson.fromJson(json, VendorOrder.class);
    }
}
