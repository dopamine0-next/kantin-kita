package com.example.demo.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrderResponse {

    @JsonProperty("order_id")
    private UUID orderId;

    @JsonProperty("order_number")
    private String orderNumber;

    @JsonProperty("payment_url")
    private String paymentUrl;

    @JsonProperty("total_amount")
    private Double totalAmount;

    private String status;
}
