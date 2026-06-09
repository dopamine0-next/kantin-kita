package com.example.demo.dto.response;

import com.example.demo.entity.OrderItem;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorOrderItemResponse {

    private String id;
    private String name;
    private Integer quantity;
    private Double price;
    private String variantName;
    private String note;

    public static VendorOrderItemResponse from(OrderItem item) {
        return VendorOrderItemResponse.builder()
                .id(item.getId())
                .name(item.getName())
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .variantName(item.getVariantName())
                .note(item.getNote())
                .build();
    }
}
