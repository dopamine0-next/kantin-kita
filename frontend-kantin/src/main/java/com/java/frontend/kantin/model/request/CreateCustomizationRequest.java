package com.java.frontend.kantin.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class CreateCustomizationRequest {

    @JsonProperty
    private String title;

    @JsonProperty
    private String type;

    @JsonProperty
    private Boolean isRequired;

    @JsonProperty
    private List<CreateCustomizationOption> options;

    public CreateCustomizationRequest() {
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

    public List<CreateCustomizationOption> getOptions() {
        return options;
    }

    public void setOptions(List<CreateCustomizationOption> options) {
        this.options = options;
    }

    public static class CreateCustomizationOption {

        @JsonProperty
        private String label;

        @JsonProperty
        private Double price;

        public CreateCustomizationOption() {
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
}
