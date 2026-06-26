package com.java.frontend.admin.service;

import com.google.gson.Gson;
import com.java.frontend.admin.config.ApiClient;
import com.java.frontend.admin.model.AdminLoginRequest;
import com.java.frontend.admin.model.AdminLoginResponse;

public class AuthService {

    private static final Gson gson = new Gson();

    public static AdminLoginResponse login(String email, String password) {
        AdminLoginRequest req = new AdminLoginRequest(email, password);
        String json = ApiClient.post("/admin/auth/login", gson.toJson(req));
        AdminLoginResponse resp = gson.fromJson(json, AdminLoginResponse.class);
        ApiClient.setToken(resp.getToken());
        return resp;
    }

    public static void logout() {
        ApiClient.setToken(null);
    }
}
