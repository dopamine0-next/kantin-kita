package com.example.demo.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateLocationRequest {

    private String name;

    private String address;

    private Double latitude;

    private Double longitude;
}
