package com.java.frontend.kantin.util;

import java.io.*;
import java.nio.file.*;
import java.util.Properties;

public class TokenManager {

    private static final String CONFIG_DIR = System.getProperty("user.home") + "/.kantin-kita";
    private static final String CONFIG_FILE = CONFIG_DIR + "/vendor-session.properties";
    private static final String KEY_TOKEN = "jwt.token";
    private static final String KEY_VENDOR_ID = "vendor.id";

    private String token;
    private String vendorId;

    public TokenManager() {
        load();
    }

    public boolean hasToken() {
        return token != null && !token.isBlank();
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }

    public void save() {
        try {
            Files.createDirectories(Paths.get(CONFIG_DIR));
            var props = new Properties();
            if (token != null) props.setProperty(KEY_TOKEN, token);
            if (vendorId != null) props.setProperty(KEY_VENDOR_ID, vendorId);
            try (var os = new FileOutputStream(CONFIG_FILE)) {
                props.store(os, "Kantin Kita Vendor Session");
            }
        } catch (IOException e) {
            System.err.println("Failed to save session: " + e.getMessage());
        }
    }

    public void clear() {
        this.token = null;
        this.vendorId = null;
        try {
            Files.deleteIfExists(Paths.get(CONFIG_FILE));
        } catch (IOException e) {
            System.err.println("Failed to clear session: " + e.getMessage());
        }
    }

    private void load() {
        var file = Paths.get(CONFIG_FILE);
        if (!Files.exists(file)) return;
        var props = new Properties();
        try (var is = new FileInputStream(CONFIG_FILE)) {
            props.load(is);
            this.token = props.getProperty(KEY_TOKEN);
            this.vendorId = props.getProperty(KEY_VENDOR_ID);
        } catch (IOException e) {
            System.err.println("Failed to load session: " + e.getMessage());
        }
    }
}
