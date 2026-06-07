package com.java.frontend.kantin.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class MenuCustomizationResponse {

    @JsonProperty
    private String title;

    @JsonProperty
    private String type;

    @JsonProperty
    private List<CustomizationOptionResponse> options;

    @JsonProperty
    private Boolean required;

    public MenuCustomizationResponse() {
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

    public List<CustomizationOptionResponse> getOptions() {
        return options;
    }

    public void setOptions(List<CustomizationOptionResponse> options) {
        this.options = options;
    }

    public Boolean getRequired() {
        return required;
    }

    public void setRequired(Boolean required) {
        this.required = required;
    }
}
