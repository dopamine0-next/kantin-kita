package com.example.demo.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCustomizationOptionRequest {

    private String label;
    private Double price;
}
