package com.java.frontend.kantin;

public final class Config {

    public static final String BASE_URL = "http://localhost:8080";
    public static final String API_PREFIX = "/api/v1";
    public static final String VENDOR_AUTH_LOGIN = API_PREFIX + "/vendor/auth/login";
    public static final String VENDOR_AUTH_ME = API_PREFIX + "/vendor/auth/me";
    public static final String VENDOR_RESTAURANT = API_PREFIX + "/vendor/restaurants";
    public static final String VENDOR_MENUS = API_PREFIX + "/vendor/menus";
    public static final String VENDOR_ORDERS = API_PREFIX + "/vendor/orders";
    public static final String VENDOR_CUSTOMIZATIONS = API_PREFIX + "/vendor/customizations";
    public static final String VENDOR_CUSTOMIZATION_OPTIONS = API_PREFIX + "/vendor/customization-options";

    private Config() {
    }
}
