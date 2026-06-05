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
    private List<VendorOrderAddonResponse> addons;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class VendorOrderAddonResponse {
        private String name;
        private Double price;
    }

    public static VendorOrderItemResponse from(OrderItem item) {
        return VendorOrderItemResponse.builder()
                .id(item.getId())
                .name(item.getName())
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .variantName(item.getVariantName())
                .note(item.getNote())
                .addons(item.getAddons().stream()
                        .map(a -> VendorOrderAddonResponse.builder()
                                .name(a.getName())
                                .price(a.getPrice())
                                .build())
                        .toList())
                .build();
    }
}
