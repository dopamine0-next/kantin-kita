package com.java.frontend.kantin.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdateHoursRequest {

    @JsonProperty
    private String operationalHours;

    public UpdateHoursRequest() {
    }

    public UpdateHoursRequest(String operationalHours) {
        this.operationalHours = operationalHours;
    }

    public String getOperationalHours() {
        return operationalHours;
    }

    public void setOperationalHours(String operationalHours) {
        this.operationalHours = operationalHours;
    }
}
