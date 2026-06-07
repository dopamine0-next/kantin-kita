package com.java.frontend.kantin.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CustomizationOptionResponse {

    @JsonProperty
    private String label;

    @JsonProperty
    private Double price;

    public CustomizationOptionResponse() {
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
