package com.example.demo.entity.enums;

public enum OrderMode {
    DINE_IN, PICKUP;

    public static OrderMode fromString(String s) {
        return valueOf(s.toUpperCase().replace("-", "_"));
    }
}
