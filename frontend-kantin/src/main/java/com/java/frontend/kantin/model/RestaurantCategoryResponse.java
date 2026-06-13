package com.java.frontend.kantin.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RestaurantCategoryResponse {

    @JsonProperty
    private String id;

    @JsonProperty
    private String name;

    public RestaurantCategoryResponse() {
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
}
