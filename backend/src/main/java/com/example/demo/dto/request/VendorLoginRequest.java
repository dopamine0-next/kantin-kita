package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VendorLoginRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
