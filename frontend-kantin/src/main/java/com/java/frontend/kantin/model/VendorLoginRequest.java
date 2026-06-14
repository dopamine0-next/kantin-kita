package com.java.frontend.kantin.model;

public class VendorLoginRequest {

    private String email;
    private String password;

    public VendorLoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() { return email; }
    public String getPassword() { return password; }
}
