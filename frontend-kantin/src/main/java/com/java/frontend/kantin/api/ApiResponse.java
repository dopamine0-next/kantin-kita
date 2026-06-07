package com.java.frontend.kantin.api;

public class ApiResponse<T> {

    private final T data;
    private final int statusCode;
    private final String errorMessage;
    private final boolean success;

    private ApiResponse(T data, int statusCode, String errorMessage, boolean success) {
        this.data = data;
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
        this.success = success;
    }

    public static <T> ApiResponse<T> success(T data, int statusCode) {
        return new ApiResponse<>(data, statusCode, null, true);
    }

    public static <T> ApiResponse<T> error(int statusCode, String message) {
        return new ApiResponse<>(null, statusCode, message, false);
    }

    public T getData() {
        return data;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public boolean isSuccess() {
        return success;
    }
}
