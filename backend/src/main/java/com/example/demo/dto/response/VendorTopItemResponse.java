package com.example.demo.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorTopItemResponse {

    private String menuItemId;
    private String name;
    private String imageUrl;
    private Long totalQuantity;
    private Double totalRevenue;
}
