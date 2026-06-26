package com.java.frontend.admin.config;

import java.io.ByteArrayOutputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class ApiClient {

    private static final String DEFAULT_BASE_URL = "http://localhost:8080/api/v1";
    private static String baseUrl = DEFAULT_BASE_URL;
    private static String token;

    private static final HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    public static void setBaseUrl(String url) {
        baseUrl = url;
    }

    public static void setToken(String t) {
        token = t;
    }

    public static String getToken() {
        return token;
    }

    public static String get(String path) {
        return request("GET", path, null);
    }

    public static String post(String path, String jsonBody) {
        return request("POST", path, jsonBody);
    }

    public static String put(String path, String jsonBody) {
        return request("PUT", path, jsonBody);
    }

    public static String patch(String path, String jsonBody) {
        return request("PATCH", path, jsonBody);
    }

    public static String delete(String path) {
        return request("DELETE", path, null);
    }

    public static String uploadFile(String path, byte[] fileBytes, String fileName, String mimeType) {
        try {
            var boundary = "Boundary-" + System.currentTimeMillis();
            var lineEnd = "\r\n".getBytes();
            var body = new ByteArrayOutputStream();
            body.write(("--" + boundary + "\r\n").getBytes());
            body.write(("Content-Disposition: form-data; name=\"file\"; filename=\"" + fileName + "\"\r\n").getBytes());
            body.write(("Content-Type: " + mimeType + "\r\n\r\n").getBytes());
            body.write(fileBytes);
            body.write("\r\n".getBytes());
            body.write(("--" + boundary + "--\r\n").getBytes());

            var builder = HttpRequest.newBuilder()
                    .uri(URI.create(baseUrl + path))
                    .timeout(Duration.ofSeconds(60))
                    .header("Content-Type", "multipart/form-data; boundary=" + boundary);

            if (token != null && !token.isBlank()) {
                builder.header("Authorization", "Bearer " + token);
            }

            var request = builder.POST(HttpRequest.BodyPublishers.ofByteArray(body.toByteArray())).build();
            var response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 400) {
                throw new RuntimeException("HTTP " + response.statusCode() + ": " + response.body());
            }
            return response.body();
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Upload failed: " + e.getMessage());
        }
    }

    private static String request(String method, String path, String jsonBody) {
        try {
            HttpRequest.Builder builder = HttpRequest.newBuilder()
                    .uri(URI.create(baseUrl + path))
                    .timeout(Duration.ofSeconds(30))
                    .header("Content-Type", "application/json");

            if (token != null && !token.isBlank()) {
                builder.header("Authorization", "Bearer " + token);
            }

            HttpRequest.BodyPublisher body = jsonBody != null
                    ? HttpRequest.BodyPublishers.ofString(jsonBody)
                    : HttpRequest.BodyPublishers.noBody();

            HttpRequest request = switch (method) {
                case "POST" -> builder.POST(body).build();
                case "PUT" -> builder.PUT(body).build();
                case "PATCH" -> builder.method("PATCH", body).build();
                case "DELETE" -> builder.DELETE().build();
                default -> builder.GET().build();
            };

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 400) {
                throw new RuntimeException("HTTP " + response.statusCode() + ": " + response.body());
            }

            return response.body();
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Request failed: " + e.getMessage());
        }
    }
}
