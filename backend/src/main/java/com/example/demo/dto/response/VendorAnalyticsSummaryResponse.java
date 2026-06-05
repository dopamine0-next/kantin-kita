package com.example.demo.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorAnalyticsSummaryResponse {

    private Integer todayOrders;
    private Double todayRevenue;
    private Integer pendingOrders;
    private Integer processingOrders;
    private Double averageRating;
}
