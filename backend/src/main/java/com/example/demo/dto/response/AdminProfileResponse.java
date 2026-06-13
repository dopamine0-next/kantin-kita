package com.example.demo.dto.response;

import com.example.demo.entity.Admin;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminProfileResponse {

    private String id;
    private String email;
    private String name;

    public static AdminProfileResponse from(Admin admin) {
        return AdminProfileResponse.builder()
                .id(admin.getId())
                .email(admin.getEmail())
                .name(admin.getName())
                .build();
    }
}
