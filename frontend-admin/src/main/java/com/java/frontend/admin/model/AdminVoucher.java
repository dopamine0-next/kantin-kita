package com.java.frontend.admin.model;

public class AdminVoucher {

    private String id;
    private String code;
    private Double value;
    private String description;
    private Double minSpend;
    private Double maxDiscount;
    private Boolean isActive;

    public String getId() { return id; }
    public String getCode() { return code; }
    public Double getValue() { return value; }
    public String getDescription() { return description; }
    public Double getMinSpend() { return minSpend; }
    public Double getMaxDiscount() { return maxDiscount; }
    public Boolean getIsActive() { return isActive; }
}
