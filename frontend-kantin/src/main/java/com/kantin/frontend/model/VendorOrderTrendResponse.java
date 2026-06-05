package com.kantin.frontend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class VendorOrderTrendResponse {
    public String date;
    public Integer orderCount;
    public Double totalRevenue;

    public VendorOrderTrendResponse() {}
}
