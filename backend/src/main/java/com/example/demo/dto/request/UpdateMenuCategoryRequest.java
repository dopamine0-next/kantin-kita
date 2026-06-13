package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMenuCategoryRequest {

    @NotBlank
    private String name;

    private Integer priority;
}
