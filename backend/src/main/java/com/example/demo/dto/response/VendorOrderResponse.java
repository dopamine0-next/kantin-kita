package com.example.demo.dto.response;

import com.example.demo.entity.Order;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorOrderResponse {

    private String id;
    private String orderNumber;
    private String status;
    private String paymentStatus;
    private String mode;
    private Double subtotal;
    private Double discountAmount;
    private Double appFee;
    private Double totalAmount;
    private String createdAt;
    private String updatedAt;
    private VendorCustomerResponse customer;
    private List<VendorOrderItemResponse> items;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class VendorCustomerResponse {
        private String id;
        private String name;
        private String nim;
    }

    public static VendorOrderResponse from(Order order) {
        return VendorOrderResponse.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .status(order.getStatus().name())
                .paymentStatus(order.getPaymentStatus().name())
                .mode(order.getMode().name())
                .subtotal(order.getSubtotal())
                .discountAmount(order.getDiscountAmount())
                .appFee(order.getAppFee())
                .totalAmount(order.getTotalAmount())
                .createdAt(order.getCreatedAt().toString())
                .updatedAt(order.getUpdatedAt() != null ? order.getUpdatedAt().toString() : null)
                .customer(VendorCustomerResponse.builder()
                        .id(order.getUser().getId())
                        .name(order.getUser().getName())
                        .nim(order.getUser().getNim())
                        .build())
                .items(order.getItems().stream()
                        .map(VendorOrderItemResponse::from)
                        .toList())
                .build();
    }
}
