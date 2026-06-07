package com.java.frontend.kantin.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class VendorCustomizationOptionResponse {

    @JsonProperty
    private String id;

    @JsonProperty
    private String label;

    @JsonProperty
    private Double price;

    public VendorCustomizationOptionResponse() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
