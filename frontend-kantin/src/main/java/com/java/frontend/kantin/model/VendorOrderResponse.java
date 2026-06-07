package com.java.frontend.kantin.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class VendorOrderResponse {

    @JsonProperty
    private String id;

    @JsonProperty
    private String orderNumber;

    @JsonProperty
    private String status;

    @JsonProperty
    private String paymentStatus;

    @JsonProperty
    private String mode;

    @JsonProperty
    private Double subtotal;

    @JsonProperty
    private Double discountAmount;

    @JsonProperty
    private Double appFee;

    @JsonProperty
    private Double totalAmount;

    @JsonProperty
    private String createdAt;

    @JsonProperty
    private String updatedAt;

    @JsonProperty
    private VendorCustomerResponse customer;

    @JsonProperty
    private List<VendorOrderItemResponse> items;

    public VendorOrderResponse() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Double getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(Double discountAmount) {
        this.discountAmount = discountAmount;
    }

    public Double getAppFee() {
        return appFee;
    }

    public void setAppFee(Double appFee) {
        this.appFee = appFee;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public VendorCustomerResponse getCustomer() {
        return customer;
    }

    public void setCustomer(VendorCustomerResponse customer) {
        this.customer = customer;
    }

    public List<VendorOrderItemResponse> getItems() {
        return items;
    }

    public void setItems(List<VendorOrderItemResponse> items) {
        this.items = items;
    }

    // --- Inner classes ---

    public static class VendorCustomerResponse {

        @JsonProperty
        private String id;

        @JsonProperty
        private String name;

        @JsonProperty
        private String nim;

        public VendorCustomerResponse() {
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getNim() {
            return nim;
        }

        public void setNim(String nim) {
            this.nim = nim;
        }
    }
}
