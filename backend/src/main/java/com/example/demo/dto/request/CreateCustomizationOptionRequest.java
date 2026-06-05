package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCustomizationOptionRequest {

    @NotBlank
    private String label;

    private Double price;
}
