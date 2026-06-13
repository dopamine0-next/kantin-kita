package com.example.demo.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardSummaryResponse {

    private Long totalRestaurants;
    private Long totalVendors;
    private Long totalUsers;
    private Long totalOrders;
    private Integer todayOrders;
    private Double todayRevenue;
    private Double totalRevenue;
    private Double averageRating;
}
