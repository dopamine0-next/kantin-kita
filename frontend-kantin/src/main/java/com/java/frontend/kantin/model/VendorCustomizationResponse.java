package com.java.frontend.kantin.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class VendorCustomizationResponse {

    @JsonProperty
    private String id;

    @JsonProperty
    private String title;

    @JsonProperty
    private String type;

    @JsonProperty
    private Boolean isRequired;

    @JsonProperty
    private List<VendorCustomizationOptionResponse> options;

    public VendorCustomizationResponse() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getIsRequired() {
        return isRequired;
    }

    public void setIsRequired(Boolean isRequired) {
        this.isRequired = isRequired;
    }

    public List<VendorCustomizationOptionResponse> getOptions() {
        return options;
    }

    public void setOptions(List<VendorCustomizationOptionResponse> options) {
        this.options = options;
    }
}
