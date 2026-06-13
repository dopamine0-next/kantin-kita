package com.example.demo.service;

import com.example.demo.dto.request.CreateVoucherRequest;
import com.example.demo.dto.request.UpdateVoucherRequest;
import com.example.demo.dto.response.AdminVoucherResponse;
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
public class AdminVoucherService {

    private final VoucherRepository repository;

    public List<AdminVoucherResponse> findAll() {
        return repository.findAll().stream()
                .map(AdminVoucherResponse::from)
                .toList();
    }

    public AdminVoucherResponse findById(String id) {
        return repository.findById(id)
                .map(AdminVoucherResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Voucher not found"));
    }

    @Transactional
    public AdminVoucherResponse create(CreateVoucherRequest request) {
        Voucher voucher = Voucher.builder()
                .code(request.getCode().trim().toUpperCase())
                .value(request.getValue())
                .description(request.getDescription())
                .minSpend(request.getMinSpend())
                .maxDiscount(request.getMaxDiscount())
                .isActive(true)
                .build();
        return AdminVoucherResponse.from(repository.save(voucher));
    }

    @Transactional
    public AdminVoucherResponse update(String id, UpdateVoucherRequest request) {
        Voucher voucher = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Voucher not found"));

        if (request.getCode() != null) voucher.setCode(request.getCode().trim().toUpperCase());
        if (request.getValue() != null) voucher.setValue(request.getValue());
        if (request.getDescription() != null) voucher.setDescription(request.getDescription());
        if (request.getMinSpend() != null) voucher.setMinSpend(request.getMinSpend());
        if (request.getMaxDiscount() != null) voucher.setMaxDiscount(request.getMaxDiscount());

        return AdminVoucherResponse.from(repository.save(voucher));
    }

    @Transactional
    public void delete(String id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Voucher not found");
        }
        repository.deleteById(id);
    }

    @Transactional
    public AdminVoucherResponse toggleActive(String id) {
        Voucher voucher = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Voucher not found"));
        voucher.setIsActive(!voucher.getIsActive());
        return AdminVoucherResponse.from(repository.save(voucher));
    }
}
