package com.example.demo.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBannerRequest {

    private String imageUrl;
    private String title;
    private String linkUrl;
    private String locationId;
}
