package com.example.demo.dto.response;

import com.example.demo.entity.Order;
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
public class OrderResponse {

    private String id;

    @JsonProperty("restaurant_id")
    private String restaurantId;

    @JsonProperty("restaurant_name")
    private String restaurantName;

    @JsonProperty("restaurant_image")
    private String restaurantImage;

    private String status;

    @JsonProperty("total_amount")
    private Double totalAmount;

    private String mode;

    @JsonProperty("order_number")
    private String orderNumber;

    @JsonProperty("payment_url")
    private String paymentUrl;

    @JsonProperty("payment_status")
    private String paymentStatus;

    @JsonProperty("discount_amount")
    private Double discountAmount;

    @JsonProperty("app_fee")
    private Double appFee;

    @JsonProperty("created_at")
    private String createdAt;

    @JsonProperty("updated_at")
    private String updatedAt;

    private List<OrderItemResponse> items;

    public static OrderResponse from(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .restaurantId(order.getRestaurant().getId())
                .restaurantName(order.getRestaurant().getName())
                .restaurantImage(order.getRestaurant().getImageUrl())
                .status(order.getStatus().name().toLowerCase())
                .totalAmount(order.getTotalAmount())
                .mode(order.getMode().name().toLowerCase().replace("_", "-"))
                .orderNumber(order.getOrderNumber())
                .paymentUrl(order.getPaymentUrl())
                .paymentStatus(order.getPaymentStatus().name().toLowerCase())
                .discountAmount(order.getDiscountAmount())
                .appFee(order.getAppFee())
                .createdAt(order.getCreatedAt().toString())
                .updatedAt(order.getUpdatedAt().toString())
                .items(order.getItems().stream()
                        .map(OrderItemResponse::from)
                        .toList())
                .build();
    }
}
