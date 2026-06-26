package com.example.demo.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorRevenueResponse {

    private Double totalRevenue;
    private Integer totalOrders;
    private List<RevenueBreakdown> breakdown;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RevenueBreakdown {
        private String date;
        private Double revenue;
        private Integer orderCount;
    }
}
