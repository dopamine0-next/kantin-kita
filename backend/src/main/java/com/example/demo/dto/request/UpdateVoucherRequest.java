package com.example.demo.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateVoucherRequest {

    private String code;
    private Double value;
    private String description;
    private Double minSpend;
    private Double maxDiscount;
}
