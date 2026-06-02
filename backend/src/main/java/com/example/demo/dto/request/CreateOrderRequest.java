package com.example.demo.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderRequest {

    @NotNull
    private String restaurantId;

    @NotEmpty
    @Valid
    private List<CreateOrderItemRequest> items;

    @NotNull
    private String mode;

    private String voucherCode;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateOrderItemRequest {

        @NotNull
        private String menuItemId;

        @NotNull
        private Integer qty;

        private String variantName;
        private String note;
        private List<CreateOrderAddonRequest> addons;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateOrderAddonRequest {

        @NotNull
        private String name;

        private Double price;
    }
}
