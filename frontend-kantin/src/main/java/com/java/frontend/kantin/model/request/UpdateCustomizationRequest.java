package com.java.frontend.kantin.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdateCustomizationRequest {

    @JsonProperty
    private String title;

    @JsonProperty
    private String type;

    @JsonProperty
    private Boolean isRequired;

    public UpdateCustomizationRequest() {
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
}
