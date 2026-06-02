package com.example.demo.dto.response;

import com.example.demo.entity.MenuCustomization;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MenuCustomizationResponse {

    private String title;
    private String type;
    private List<CustomizationOptionResponse> options;
    private Boolean required;

    public static MenuCustomizationResponse from(MenuCustomization customization) {
        return MenuCustomizationResponse.builder()
                .title(customization.getTitle())
                .type(customization.getType().name().toLowerCase())
                .options(customization.getOptions().stream()
                        .map(CustomizationOptionResponse::from)
                        .toList())
                .required(customization.getIsRequired())
                .build();
    }
}
