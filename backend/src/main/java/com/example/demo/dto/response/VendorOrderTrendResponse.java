package com.example.demo.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorOrderTrendResponse {

    private String date;
    private Integer orderCount;
    private Double totalRevenue;
}
