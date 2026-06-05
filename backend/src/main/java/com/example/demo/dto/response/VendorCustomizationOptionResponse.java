package com.example.demo.dto.response;

import com.example.demo.entity.CustomizationOption;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorCustomizationOptionResponse {

    private String id;
    private String label;
    private Double price;

    public static VendorCustomizationOptionResponse from(CustomizationOption o) {
        return VendorCustomizationOptionResponse.builder()
                .id(o.getId())
                .label(o.getLabel())
                .price(o.getPrice())
                .build();
    }
}
