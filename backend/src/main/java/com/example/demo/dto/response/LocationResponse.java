package com.example.demo.dto.response;

import com.example.demo.entity.Location;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationResponse {

    private String id;
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;

    public static LocationResponse from(Location location) {
        return LocationResponse.builder()
                .id(location.getId())
                .name(location.getName())
                .address(location.getAddress())
                .latitude(location.getLatitude())
                .longitude(location.getLongitude())
                .build();
    }
}
