package com.example.demo.dto.response;

import com.example.demo.entity.Voucher;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminVoucherResponse {

    private String id;
    private String code;
    private Double value;
    private String description;
    private Double minSpend;
    private Double maxDiscount;
    private Boolean isActive;

    public static AdminVoucherResponse from(Voucher voucher) {
        return AdminVoucherResponse.builder()
                .id(voucher.getId())
                .code(voucher.getCode())
                .value(voucher.getValue())
                .description(voucher.getDescription())
                .minSpend(voucher.getMinSpend())
                .maxDiscount(voucher.getMaxDiscount())
                .isActive(voucher.getIsActive())
                .build();
    }
}
