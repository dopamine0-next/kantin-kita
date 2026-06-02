package com.example.demo.dto.response;

import com.example.demo.entity.OrderAddon;
import com.example.demo.entity.OrderItem;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderItemResponse {

    private UUID id;
    private String name;
    private Integer quantity;
    private Double price;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("variant_name")
    private String variantName;

    private String note;

    private List<OrderAddonResponse> addons;

    public static OrderItemResponse from(OrderItem item) {
        return OrderItemResponse.builder()
                .id(item.getId())
                .name(item.getName())
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .imageUrl(item.getImageUrl())
                .variantName(item.getVariantName())
                .note(item.getNote())
                .addons(item.getAddons().isEmpty() ? null
                        : item.getAddons().stream().map(OrderAddonResponse::from).toList())
                .build();
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class OrderAddonResponse {
        private String name;
        private Double price;

        public static OrderAddonResponse from(OrderAddon addon) {
            return OrderAddonResponse.builder()
                    .name(addon.getName())
                    .price(addon.getPrice())
                    .build();
        }
    }
}
