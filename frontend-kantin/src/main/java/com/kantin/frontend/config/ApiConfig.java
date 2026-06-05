package com.kantin.frontend.config;

public class ApiConfig {

    public static final String BASE_URL = "http://localhost:8080/api/v1";

    private static String token;

    public static void setToken(String t) {
        token = t;
    }

    public static String getToken() {
        return token;
    }
}
