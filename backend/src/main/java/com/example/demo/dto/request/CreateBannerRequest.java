package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateBannerRequest {

    @NotBlank
    private String imageUrl;

    private String title;
    private String linkUrl;
    private String locationId;
}
