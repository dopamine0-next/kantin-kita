package com.example.demo.service;

import com.example.demo.dto.request.ValidateVoucherRequest;
import com.example.demo.dto.response.ValidateVoucherResponse;
import com.example.demo.dto.response.VoucherResponse;
import com.example.demo.entity.Voucher;
import com.example.demo.repository.VoucherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VoucherService {

    private final VoucherRepository voucherRepository;

    public List<VoucherResponse> getVouchers() {
        return voucherRepository.findByIsActiveTrue().stream()
                .map(VoucherResponse::from)
                .toList();
    }

    public ValidateVoucherResponse validate(ValidateVoucherRequest request) {
        Voucher voucher = voucherRepository.findByCodeAndIsActiveTrue(request.getCode().trim().toUpperCase())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Voucher not found or inactive"));

        if (voucher.getMinSpend() != null && request.getSubtotal() < voucher.getMinSpend()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Minimum spend is Rp " + voucher.getMinSpend().longValue());
        }

        double discount = request.getSubtotal() * voucher.getValue() / 100;
        if (voucher.getMaxDiscount() != null && discount > voucher.getMaxDiscount()) {
            discount = voucher.getMaxDiscount();
        }

        return ValidateVoucherResponse.builder()
                .valid(true)
                .voucher(VoucherResponse.from(voucher))
                .discount(discount)
                .build();
    }
}
