package com.java.frontend.kantin.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdateOrderStatusRequest {

    @JsonProperty
    private String status;

    public UpdateOrderStatusRequest() {
    }

    public UpdateOrderStatusRequest(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
