package com.example.demo.dto.response;

import com.example.demo.entity.CustomizationOption;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CustomizationOptionResponse {

    private String label;
    private Double price;

    public static CustomizationOptionResponse from(CustomizationOption option) {
        return CustomizationOptionResponse.builder()
                .label(option.getLabel())
                .price(option.getPrice())
                .build();
    }
}
