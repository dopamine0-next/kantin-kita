package com.example.demo.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateVendorRequest {

    private String name;
    private String email;
    private String phone;
    private String password;
    private String avatarUrl;
}
