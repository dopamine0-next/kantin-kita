package com.example.demo.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentCallbackRequest {

    private String id;

    @JsonProperty("external_id")
    private String externalId;

    private String status;

    private Number amount;

    @JsonProperty("paid_amount")
    private Number paidAmount;

    @JsonProperty("paid_at")
    private String paidAt;

    @JsonProperty("payment_channel")
    private String paymentChannel;

    @JsonProperty("payment_method")
    private String paymentMethod;

    @JsonProperty("payer_email")
    private String payerEmail;

    private String description;
}
