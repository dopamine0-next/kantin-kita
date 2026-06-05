package com.example.demo.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCustomizationRequest {

    private String title;
    private String type;
    private Boolean isRequired;
}
