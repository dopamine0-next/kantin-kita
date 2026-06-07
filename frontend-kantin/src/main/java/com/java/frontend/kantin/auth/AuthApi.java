package com.java.frontend.kantin.auth;

import com.java.frontend.kantin.Config;
import com.java.frontend.kantin.api.ApiClient;
import com.java.frontend.kantin.api.ApiResponse;
import com.java.frontend.kantin.model.LoginRequest;
import com.java.frontend.kantin.model.LoginResponse;

public class AuthApi {

    private final ApiClient client;

    public AuthApi(ApiClient client) {
        this.client = client;
    }

    public ApiResponse<LoginResponse> login(String email, String password) {
        var request = new LoginRequest(email, password);
        return client.post(Config.VENDOR_AUTH_LOGIN, request, LoginResponse.class);
    }
}
