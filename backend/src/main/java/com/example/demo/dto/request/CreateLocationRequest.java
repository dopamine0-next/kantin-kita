package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateLocationRequest {

    @NotBlank
    private String name;

    private String address;

    private Double latitude;

    private Double longitude;
}
