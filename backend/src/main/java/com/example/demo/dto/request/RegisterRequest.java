package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @NotBlank
    private String name;

    @NotBlank
    @Pattern(regexp = "\\d{12,15}", message = "NIM must be 12-15 digits")
    private String nim;

    @NotBlank
    private String password;

    private Integer semester;

    private Integer locationId;
}
