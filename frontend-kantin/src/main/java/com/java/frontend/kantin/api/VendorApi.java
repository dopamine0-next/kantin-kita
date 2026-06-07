package com.java.frontend.kantin.api;

import com.java.frontend.kantin.Config;
import com.java.frontend.kantin.model.VendorAnalyticsSummaryResponse;
import com.java.frontend.kantin.model.VendorRestaurantResponse;
import com.java.frontend.kantin.model.request.UpdateHoursRequest;
import com.java.frontend.kantin.model.request.UpdateRestaurantRequest;

public class VendorApi {

    private final ApiClient client;

    public VendorApi(ApiClient client) {
        this.client = client;
    }

    public ApiResponse<VendorAnalyticsSummaryResponse> getAnalyticsSummary(String restaurantId) {
        String path = Config.VENDOR_RESTAURANT + "/" + restaurantId + "/analytics/summary";
        return client.get(path, VendorAnalyticsSummaryResponse.class);
    }

    public ApiResponse<VendorRestaurantResponse> getRestaurant(String restaurantId) {
        String path = Config.VENDOR_RESTAURANT + "/" + restaurantId;
        return client.get(path, VendorRestaurantResponse.class);
    }

    public ApiResponse<VendorRestaurantResponse> updateRestaurant(String restaurantId, UpdateRestaurantRequest body) {
        String path = Config.VENDOR_RESTAURANT + "/" + restaurantId;
        return client.put(path, body, VendorRestaurantResponse.class);
    }

    public ApiResponse<VendorRestaurantResponse> toggleStatus(String restaurantId) {
        String path = Config.VENDOR_RESTAURANT + "/" + restaurantId + "/status";
        return client.patch(path, null, VendorRestaurantResponse.class);
    }

    public ApiResponse<VendorRestaurantResponse> updateHours(String restaurantId, String operationalHours) {
        String path = Config.VENDOR_RESTAURANT + "/" + restaurantId + "/hours";
        return client.put(path, new UpdateHoursRequest(operationalHours), VendorRestaurantResponse.class);
    }
}
