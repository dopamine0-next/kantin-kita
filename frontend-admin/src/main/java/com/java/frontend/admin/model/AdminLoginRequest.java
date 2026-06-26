package com.java.frontend.admin.model;

public class AdminLoginRequest {

    private String email;
    private String password;

    public AdminLoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
