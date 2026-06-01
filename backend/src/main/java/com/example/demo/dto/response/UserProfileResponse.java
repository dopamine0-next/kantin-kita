package com.example.demo.dto.response;

import com.example.demo.entity.User;
import com.example.demo.entity.enums.Role;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileResponse {

    private UUID id;
    private String name;
    private String nim;
    private String avatarUrl;
    private Integer semester;
    private Role role;
    private String locationName;
    private Integer locationId;

    public static UserProfileResponse from(User user) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .nim(user.getNim())
                .avatarUrl(user.getAvatarUrl())
                .semester(user.getSemester())
                .role(user.getRole())
                .locationName(user.getLocation() != null ? user.getLocation().getName() : null)
                .locationId(user.getLocation() != null ? user.getLocation().getId() : null)
                .build();
    }
}
