package com.example.demo.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminUpdateRestaurantRequest {

    private String name;
    private String restaurantCategoryId;
    private String vendorId;
    private String locationId;
    private Boolean isOpen;
    private String imageUrl;
    private String bannerImageUrl;
    private String address;
    private String operationalHours;
    private Double cheapestPrice;
}
