package com.example.demo.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminRevenueResponse {

    private Double totalRevenue;
    private Integer totalOrders;
    private List<AdminRevenueBreakdown> breakdown;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AdminRevenueBreakdown {
        private String date;
        private Double revenue;
        private Integer orderCount;
    }
}
