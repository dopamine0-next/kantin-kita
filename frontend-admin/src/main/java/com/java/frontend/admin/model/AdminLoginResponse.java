package com.java.frontend.admin.model;

public class AdminLoginResponse {

    private String token;
    private AdminProfile admin;

    public String getToken() {
        return token;
    }

    public AdminProfile getAdmin() {
        return admin;
    }

    public static class AdminProfile {
        private String id;
        private String email;
        private String name;

        public String getId() { return id; }
        public String getEmail() { return email; }
        public String getName() { return name; }
    }
}
