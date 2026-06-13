package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateVoucherRequest {

    @NotBlank
    private String code;

    @NotNull
    private Double value;

    private String description;
    private Double minSpend;
    private Double maxDiscount;
}
