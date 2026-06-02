package com.example.demo.dto.response;

import com.example.demo.entity.Banner;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BannerResponse {

    private Long id;
    private String imageUrl;
    private String title;
    private String linkUrl;
    private Boolean isActive;
    private String locationName;
    private Integer locationId;

    public static BannerResponse from(Banner banner) {
        return BannerResponse.builder()
                .id(banner.getId())
                .imageUrl(banner.getImageUrl())
                .title(banner.getTitle())
                .linkUrl(banner.getLinkUrl())
                .isActive(banner.getIsActive())
                .locationName(banner.getLocation() != null ? banner.getLocation().getName() : null)
                .locationId(banner.getLocation() != null ? banner.getLocation().getId() : null)
                .build();
    }
}
