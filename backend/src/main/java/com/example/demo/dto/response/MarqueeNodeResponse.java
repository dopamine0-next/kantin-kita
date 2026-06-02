package com.example.demo.dto.response;

import com.example.demo.entity.MarqueeNode;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarqueeNodeResponse {

    private Long id;
    private String text;
    private Boolean isActive;

    public static MarqueeNodeResponse from(MarqueeNode node) {
        return MarqueeNodeResponse.builder()
                .id(node.getId())
                .text(node.getText())
                .isActive(node.getIsActive())
                .build();
    }
}
