package com.java.frontend.kantin.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.java.frontend.kantin.config.ApiClient;
import com.java.frontend.kantin.model.VendorReview;

import java.lang.reflect.Type;
import java.util.List;

public class ReviewService {

    private static final Gson gson = new Gson();

    public static List<VendorReview> getReviews(String restaurantId) {
        String json = ApiClient.get("/vendor/restaurants/" + restaurantId + "/reviews");
        Type type = new TypeToken<List<VendorReview>>() {}.getType();
        return gson.fromJson(json, type);
    }
}
