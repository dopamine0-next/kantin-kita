package com.java.frontend.kantin.api;

import com.java.frontend.kantin.Config;
import com.java.frontend.kantin.api.ApiClient;
import com.java.frontend.kantin.api.ApiResponse;
import com.java.frontend.kantin.model.VendorAnalyticsSummaryResponse;

public class VendorApi {

    private final ApiClient client;

    public VendorApi(ApiClient client) {
        this.client = client;
    }

    public ApiResponse<VendorAnalyticsSummaryResponse> getAnalyticsSummary(String restaurantId) {
        String path = Config.VENDOR_RESTAURANT + "/" + restaurantId + "/analytics/summary";
        return client.get(path, VendorAnalyticsSummaryResponse.class);
    }
}
