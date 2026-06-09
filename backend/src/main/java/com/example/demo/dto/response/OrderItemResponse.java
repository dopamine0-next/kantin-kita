package com.example.demo.dto.response;

import com.example.demo.entity.OrderItem;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderItemResponse {

    private String id;
    private String name;
    private Integer quantity;
    private Double price;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("variant_name")
    private String variantName;

    @JsonProperty("menu_item_id")
    private String menuItemId;

    private String note;

    public static OrderItemResponse from(OrderItem item) {
        return OrderItemResponse.builder()
                .id(item.getId())
                .name(item.getName())
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .imageUrl(item.getImageUrl())
                .variantName(item.getVariantName())
                .menuItemId(item.getMenuItem() != null ? item.getMenuItem().getId() : null)
                .note(item.getNote())
                .build();
    }
}
