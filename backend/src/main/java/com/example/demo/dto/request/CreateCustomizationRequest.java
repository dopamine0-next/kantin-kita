package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCustomizationRequest {

    @NotBlank
    private String title;

    @NotNull
    private String type;

    @NotNull
    private Boolean isRequired;

    private List<CreateCustomizationOptionRequest> options;
}
