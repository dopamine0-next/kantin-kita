package com.java.frontend.kantin.service;

import com.google.gson.Gson;
import com.java.frontend.kantin.config.ApiClient;

public class CustomizationService {

    private static final Gson gson = new Gson();

    public static String createCustomization(String menuId, String jsonBody) {
        return ApiClient.post("/vendor/menus/" + menuId + "/customizations", jsonBody);
    }

    public static String updateCustomization(String custId, String jsonBody) {
        return ApiClient.put("/vendor/customizations/" + custId, jsonBody);
    }

    public static void deleteCustomization(String custId) {
        ApiClient.delete("/vendor/customizations/" + custId);
    }

    public static String createOption(String custId, String jsonBody) {
        return ApiClient.post("/vendor/customizations/" + custId + "/options", jsonBody);
    }

    public static String updateOption(String optId, String jsonBody) {
        return ApiClient.put("/vendor/customization-options/" + optId, jsonBody);
    }

    public static void deleteOption(String optId) {
        ApiClient.delete("/vendor/customization-options/" + optId);
    }
}
