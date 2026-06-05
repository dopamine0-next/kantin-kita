package com.example.demo.dto.response;

import com.example.demo.entity.MenuCustomization;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorCustomizationResponse {

    private String id;
    private String title;
    private String type;
    private Boolean isRequired;
    private List<VendorCustomizationOptionResponse> options;

    public static VendorCustomizationResponse from(MenuCustomization c) {
        return VendorCustomizationResponse.builder()
                .id(c.getId())
                .title(c.getTitle())
                .type(c.getType().name())
                .isRequired(c.getIsRequired())
                .options(c.getOptions().stream()
                        .map(VendorCustomizationOptionResponse::from)
                        .toList())
                .build();
    }
}
