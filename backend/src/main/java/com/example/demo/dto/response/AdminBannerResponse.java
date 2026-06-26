package com.example.demo.dto.response;

import com.example.demo.entity.Banner;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminBannerResponse {

    private String id;
    private String imageUrl;
    private String title;
    private String linkUrl;
    private Boolean isActive;
    private LocationResponse location;

    public static AdminBannerResponse from(Banner banner) {
        return AdminBannerResponse.builder()
                .id(banner.getId())
                .imageUrl(banner.getImageUrl())
                .title(banner.getTitle())
                .linkUrl(banner.getLinkUrl())
                .isActive(banner.getIsActive())
                .location(banner.getLocation() != null ? LocationResponse.from(banner.getLocation()) : null)
                .build();
    }
}
