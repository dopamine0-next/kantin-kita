package com.example.demo.dto.response;

import com.example.demo.entity.Voucher;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VoucherResponse {

    private String id;
    private String code;
    private Double value;
    private String description;

    @JsonProperty("min_spend")
    private Double minSpend;

    @JsonProperty("max_discount")
    private Double maxDiscount;

    public static VoucherResponse from(Voucher voucher) {
        return VoucherResponse.builder()
                .id(voucher.getId())
                .code(voucher.getCode())
                .value(voucher.getValue())
                .description(voucher.getDescription())
                .minSpend(voucher.getMinSpend())
                .maxDiscount(voucher.getMaxDiscount())
                .build();
    }
}
