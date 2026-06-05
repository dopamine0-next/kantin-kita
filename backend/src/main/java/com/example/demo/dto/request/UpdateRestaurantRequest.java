package com.example.demo.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRestaurantRequest {

    private String name;
    private String cuisine;
    private String imageUrl;
    private String bannerImageUrl;
    private String address;
    private String promoText;
}
