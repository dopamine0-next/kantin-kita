package com.example.demo.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateRestaurantReviewRequest {

    @NotNull
    private String orderId;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer rating;
}
