package com.java.frontend.kantin.api;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.java.frontend.kantin.util.TokenManager;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class ApiClient {

    private static final Duration TIMEOUT = Duration.ofSeconds(30);
    private static final ObjectMapper MAPPER = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    private final HttpClient client;
    private final String baseUrl;
    private final TokenManager tokenManager;

    public ApiClient(String baseUrl, TokenManager tokenManager) {
        this.baseUrl = baseUrl;
        this.tokenManager = tokenManager;
        this.client = HttpClient.newBuilder()
                .connectTimeout(TIMEOUT)
                .build();
    }

    public static ObjectMapper mapper() {
        return MAPPER;
    }

    public <T> ApiResponse<T> get(String path, Class<T> responseType) {
        return execute(HttpRequest.newBuilder().GET(), path, responseType);
    }

    public <T> ApiResponse<T> post(String path, Object body, Class<T> responseType) {
        return execute(
                HttpRequest.newBuilder()
                        .header("Content-Type", "application/json")
                        .POST(ofBody(body)),
                path,
                responseType
        );
    }

    public <T> ApiResponse<T> put(String path, Object body, Class<T> responseType) {
        return execute(
                HttpRequest.newBuilder()
                        .header("Content-Type", "application/json")
                        .PUT(ofBody(body)),
                path,
                responseType
        );
    }

    public <T> ApiResponse<T> patch(String path, Object body, Class<T> responseType) {
        return execute(
                HttpRequest.newBuilder()
                        .header("Content-Type", "application/json")
                        .method("PATCH", ofBody(body)),
                path,
                responseType
        );
    }

    public <T> ApiResponse<T> delete(String path, Class<T> responseType) {
        return execute(HttpRequest.newBuilder().DELETE(), path, responseType);
    }

    private <T> ApiResponse<T> execute(HttpRequest.Builder builder, String path, Class<T> responseType) {
        try {
            var uri = URI.create(baseUrl + path);
            builder.uri(uri);

            if (tokenManager.hasToken()) {
                builder.header("Authorization", "Bearer " + tokenManager.getToken());
            }

            var request = builder.timeout(TIMEOUT).build();
            var response = client.send(request, HttpResponse.BodyHandlers.ofString());

            String body = response.body();
            int status = response.statusCode();

            if (status >= 200 && status < 300) {
                if (responseType == Void.class || body == null || body.isBlank()) {
                    return ApiResponse.success(null, status);
                }
                T data = MAPPER.readValue(body, responseType);
                return ApiResponse.success(data, status);
            } else {
                String message = extractErrorMessage(body);
                return ApiResponse.error(status, message);
            }
        } catch (Exception e) {
            return ApiResponse.error(0, e.getMessage());
        }
    }

    private HttpRequest.BodyPublisher ofBody(Object body) {
        try {
            String json = MAPPER.writeValueAsString(body);
            return HttpRequest.BodyPublishers.ofString(json);
        } catch (Exception e) {
            throw new RuntimeException("Failed to serialize request body", e);
        }
    }

    private String extractErrorMessage(String body) {
        if (body == null || body.isBlank()) return "Unknown error";
        try {
            var node = MAPPER.readTree(body);
            if (node.has("message")) return node.get("message").asText();
            if (node.has("error")) return node.get("error").asText();
            return body;
        } catch (Exception e) {
            return body;
        }
    }
}
