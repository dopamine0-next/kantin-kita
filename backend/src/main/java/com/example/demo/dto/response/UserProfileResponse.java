package com.example.demo.dto.response;

import com.example.demo.entity.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileResponse {

    private String id;
    private String name;
    private String nim;
    private Integer semester;
    private String locationName;
    private String locationId;

    public static UserProfileResponse from(User user) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .nim(user.getNim())
                .semester(user.getSemester())
                .locationName(user.getLocation() != null ? user.getLocation().getName() : null)
                .locationId(user.getLocation() != null ? user.getLocation().getId() : null)
                .build();
    }
}
