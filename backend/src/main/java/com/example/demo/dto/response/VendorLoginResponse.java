package com.example.demo.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorLoginResponse {

    private String token;
    private VendorProfileResponse vendor;
}
