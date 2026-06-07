package com.java.frontend.kantin.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class VendorOrderItemResponse {

    @JsonProperty
    private String id;

    @JsonProperty
    private String name;

    @JsonProperty
    private Integer quantity;

    @JsonProperty
    private Double price;

    @JsonProperty
    private String variantName;

    @JsonProperty
    private String note;

    @JsonProperty
    private List<VendorOrderAddonResponse> addons;

    public VendorOrderItemResponse() {
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getVariantName() {
        return variantName;
    }

    public void setVariantName(String variantName) {
        this.variantName = variantName;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public List<VendorOrderAddonResponse> getAddons() {
        return addons;
    }

    public void setAddons(List<VendorOrderAddonResponse> addons) {
        this.addons = addons;
    }

    public static class VendorOrderAddonResponse {

        @JsonProperty
        private String name;

        @JsonProperty
        private Double price;

        public VendorOrderAddonResponse() {
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Double getPrice() {
            return price;
        }

        public void setPrice(Double price) {
            this.price = price;
        }
    }
}
