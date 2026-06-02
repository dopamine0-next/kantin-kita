package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ValidateVoucherRequest {

    @NotBlank
    private String code;

    @Positive
    private Double subtotal;
}
