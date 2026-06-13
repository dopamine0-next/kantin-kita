package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateRestaurantRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String restaurantCategoryId;

    @NotBlank
    private String vendorId;

    @NotBlank
    private String locationId;

    @NotNull
    private Boolean isOpen;

    @NotBlank
    private String imageUrl;

    private String bannerImageUrl;
    private String address;
    private String operationalHours;
    private Double cheapestPrice;
}
