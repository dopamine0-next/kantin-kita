package com.java.frontend.kantin.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginResponse {

    @JsonProperty
    private String token;

    @JsonProperty
    private VendorProfile vendor;

    public LoginResponse() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public VendorProfile getVendor() {
        return vendor;
    }

    public void setVendor(VendorProfile vendor) {
        this.vendor = vendor;
    }
}
