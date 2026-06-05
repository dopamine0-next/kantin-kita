package com.kantin.frontend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class VendorOrderResponse {
    public String id;
    public String orderNumber;
    public String status;
    public String paymentStatus;
    public String mode;
    public Double subtotal;
    public Double discountAmount;
    public Double appFee;
    public Double totalAmount;
    public String createdAt;
    public String updatedAt;
    public Customer customer;
    public List<OrderItem> items;

    public VendorOrderResponse() {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Customer {
        public String id;
        public String name;
        public String nim;
        public Customer() {}
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class OrderItem {
        public String id;
        public String name;
        public Integer quantity;
        public Double price;
        public String variantName;
        public String note;
        public List<OrderAddon> addons;

        public OrderItem() {}

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class OrderAddon {
            public String name;
            public Double price;
            public OrderAddon() {}
        }
    }
}
