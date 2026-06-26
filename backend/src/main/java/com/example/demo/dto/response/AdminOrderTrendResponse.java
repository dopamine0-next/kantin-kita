package com.example.demo.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminOrderTrendResponse {

    private String date;
    private Integer orderCount;
    private Double totalRevenue;
}
