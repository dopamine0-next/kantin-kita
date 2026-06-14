package com.java.frontend.kantin.model;

import java.util.List;

public class VendorOrder {

    private String id;
    private String status;
    private String paymentStatus;
    private String mode;
    private Double subtotal;
    private Double discountAmount;
    private Double appFee;
    private Double totalAmount;
    private String createdAt;
    private String updatedAt;
    private VendorCustomer customer;
    private List<VendorOrderItem> items;

    public String getId() { return id; }
    public String getStatus() { return status; }
    public String getPaymentStatus() { return paymentStatus; }
    public String getMode() { return mode; }
    public Double getSubtotal() { return subtotal; }
    public Double getDiscountAmount() { return discountAmount; }
    public Double getAppFee() { return appFee; }
    public Double getTotalAmount() { return totalAmount; }
    public String getCreatedAt() { return createdAt; }
    public String getUpdatedAt() { return updatedAt; }
    public VendorCustomer getCustomer() { return customer; }
    public List<VendorOrderItem> getItems() { return items; }

    public static class VendorCustomer {
        private String id;
        private String name;
        private String nim;

        public String getId() { return id; }
        public String getName() { return name; }
        public String getNim() { return nim; }
    }

    public static class VendorOrderItem {
        private String id;
        private String name;
        private Integer quantity;
        private Double price;
        private String variantName;
        private String note;

        public String getId() { return id; }
        public String getName() { return name; }
        public Integer getQuantity() { return quantity; }
        public Double getPrice() { return price; }
        public String getVariantName() { return variantName; }
        public String getNote() { return note; }
    }
}
