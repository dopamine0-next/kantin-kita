package com.java.frontend.kantin.service;

import com.google.gson.Gson;
import com.java.frontend.kantin.config.ApiClient;
import com.java.frontend.kantin.model.VendorLoginRequest;
import com.java.frontend.kantin.model.VendorLoginResponse;

public class AuthService {

    private static final Gson gson = new Gson();

    public static VendorLoginResponse login(String email, String password) {
        VendorLoginRequest req = new VendorLoginRequest(email, password);
        String json = ApiClient.post("/vendor/auth/login", gson.toJson(req));
        VendorLoginResponse resp = gson.fromJson(json, VendorLoginResponse.class);
        ApiClient.setToken(resp.getToken());
        return resp;
    }

    public static void logout() {
        ApiClient.setToken(null);
    }
}
