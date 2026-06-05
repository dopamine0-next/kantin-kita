package com.kantin.frontend.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kantin.frontend.config.ApiConfig;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class ApiClient {

    private static final HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    private static final ObjectMapper mapper = new ObjectMapper()
            .findAndRegisterModules()
            .setVisibility(com.fasterxml.jackson.annotation.PropertyAccessor.ALL,
                    com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.NONE)
            .setVisibility(com.fasterxml.jackson.annotation.PropertyAccessor.FIELD,
                    com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY);

    public static ObjectMapper getMapper() {
        return mapper;
    }

    public static String get(String path) {
        return request("GET", path, null);
    }

    public static String post(String path, Object body) {
        return request("POST", path, body);
    }

    public static String put(String path, Object body) {
        return request("PUT", path, body);
    }

    public static String patch(String path, Object body) {
        return request("PATCH", path, body);
    }

    public static String delete(String path) {
        return request("DELETE", path, null);
    }

    private static String request(String method, String path, Object body) {
        try {
            HttpRequest.Builder builder = HttpRequest.newBuilder()
                    .uri(URI.create(ApiConfig.BASE_URL + path))
                    .timeout(Duration.ofSeconds(15))
                    .header("Content-Type", "application/json");

            if (ApiConfig.getToken() != null) {
                builder.header("Authorization", "Bearer " + ApiConfig.getToken());
            }

            String jsonBody = (body != null) ? mapper.writeValueAsString(body) : null;

            HttpRequest request = switch (method) {
                case "GET" -> builder.GET().build();
                case "DELETE" -> builder.method("DELETE", HttpRequest.BodyPublishers.noBody()).build();
                case "PATCH" -> builder.method("PATCH", HttpRequest.BodyPublishers.ofString(jsonBody != null ? jsonBody : "")).build();
                default -> {
                    if (jsonBody != null) {
                        yield builder.method(method, HttpRequest.BodyPublishers.ofString(jsonBody)).build();
                    }
                    yield builder.method(method, HttpRequest.BodyPublishers.noBody()).build();
                }
            };

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body();
        } catch (Exception e) {
            throw new RuntimeException("API request failed: " + e.getMessage(), e);
        }
    }
}
