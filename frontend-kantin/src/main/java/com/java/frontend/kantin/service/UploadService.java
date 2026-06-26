package com.java.frontend.kantin.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.java.frontend.kantin.config.ApiClient;

import java.nio.file.Files;
import java.nio.file.Path;

public class UploadService {

    private static final Gson gson = new Gson();

    public static String upload(Path filePath) {
        try {
            String mimeType = Files.probeContentType(filePath);
            if (mimeType == null) {
                String name = filePath.getFileName().toString().toLowerCase();
                if (name.endsWith(".jpg") || name.endsWith(".jpeg")) mimeType = "image/jpeg";
                else if (name.endsWith(".png")) mimeType = "image/png";
                else if (name.endsWith(".webp")) mimeType = "image/webp";
                else throw new IllegalArgumentException("File type not supported: " + name);
            }
            byte[] bytes = Files.readAllBytes(filePath);
            String fileName = filePath.getFileName().toString();
            String json = ApiClient.uploadFile("/vendor/upload", bytes, fileName, mimeType);
            JsonObject obj = gson.fromJson(json, JsonObject.class);
            return obj.get("url").getAsString();
        } catch (Exception e) {
            throw new RuntimeException("Upload gagal: " + e.getMessage());
        }
    }
}
